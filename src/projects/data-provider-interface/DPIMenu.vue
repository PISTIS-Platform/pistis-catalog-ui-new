<script>
import { useWindowScroll } from '@vueuse/core'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import Dropup from './components/Dropup'

export default {
  name: 'DPIMenu',
  components: {
    Dropup,
  },
  props: {},
  setup() {
    const scrollToTop = () => {
      const { x, y } = useWindowScroll({ behavior: 'smooth' })
      y.value = 0
    }
    return {
      scrollToTop,
    }
  },
  data() {
    return {
      visible: true,
      modal: {
        show: false,
        loading: false,
        error: null,
        message: '',
        confirm: '',
        confirmHandler: () => null,
      },
    }
  },
  computed: {
    ...mapGetters('datasetDetails', [
      'getCatalog',
      'getID',
      'getLoading',
      'getTitle',
      'getDescription',
    ]),
    ...mapGetters('auth', [
      'getUserData',
    ]),
    menuGroups() {
      return [
        {
          group: 'Dataset',
          items: [
            {
              key: 'create-dataset',
              name: this.$t('message.dataupload.createDataset'),
              to: {
                name: 'DataProviderInterface-Input',
                query: { locale: this.$route.query.locale, edit: false }, // if edit is false -> reset is triggered
                params: { property: 'datasets' },
              },
            },
            {
              name: this.$t('message.dataupload.menu.deleteDataset'),
              disabled: !this.isLocatedOnAuthorizedDatasetPage,
              handler: () => {
                this.modal = {
                  ...this.modal,
                  ...{
                    message: this.$t('message.dataupload.menu.datasetDeletion.message'),
                    confirm: this.$t('message.dataupload.menu.datasetDeletion.confirm'),
                    confirmHandler: () => this.handleDelete({ id: this.getID, property: 'datasets', catalog: this.getCatalog.id }),
                  },
                }
                $('#modal').modal({ show: true })
              },
            },
            {
              key: 'edit-dataset',
              name: this.$t('message.dataupload.menu.editDataset'),
              onlyAuthorizedDatasetPage: true,
              disabled: !this.isLocatedOnAuthorizedDatasetPage,
              to: {
                name: 'DataProviderInterface-Edit',
                params: {
                  catalog: this.getCatalog.id || 'undefined',
                  property: 'datasets',
                  id: this.getID || 'undefined',
                },
                query: {
                  draft: false,
                  locale: this.$route.query.locale,
                },
              },
            },
            {
              key: 'draft-dataset',
              name: this.$t('message.dataupload.menu.setToDraft'),
              disabled: !this.isLocatedOnAuthorizedDatasetPage,
              handler: () => {
                this.modal = {
                  ...this.modal,
                  ...{
                    message: this.$t('message.dataupload.menu.markAsDraft.message'),
                    confirm: this.$t('message.dataupload.menu.markAsDraft.confirm'),
                    confirmHandler: () => this.handleMarkAsDraft({
                      id: this.getID,
                      catalog: this.getCatalog.id,
                      title: this.getTitle,
                      description: this.getDescription,
                    }),
                  },
                }
                $('#modal').modal({ show: true })
              },
            },
            {
              key: 'register-dataset',
              name: this.$t('message.dataupload.menu.registerDoi'),
              disabled: !this.isLocatedOnAuthorizedDatasetPage,
              handler: () => {
                this.modal = {
                  ...this.modal,
                  ...{
                    message: this.$t('message.dataupload.menu.registerADoi.message'),
                    confirm: this.$t('message.dataupload.menu.registerADoi.confirm'),
                    confirmHandler: () => this.handleRegisterDoi({ id: this.getID, catalog: this.getCatalog.id, type: this.$env.content.dataProviderInterface.doiRegistrationService.persistentIdentifierType || 'mock' }),
                  },
                }
                $('#modal').modal({ show: true })
              },
            },
          ],
        },
        {
          group: 'Catalogue',
          items: [
            {
              name: 'Create Catalogue',
              to: {
                name: 'DataProviderInterface-Home',
                query: { locale: this.$route.query.locale, edit: false },
                params: { property: 'catalogues' },
              },
            },
            {
              name: 'Delete Catalogue',
              disabled: !this.isLocatedOnAuthorizedCatalogPage,
              handler: () => {
                this.modal = {
                  ...this.modal,
                  ...{
                    message: 'Are you sure you want to delete this catalogue? This can not be reverted!',
                    confirm: 'Delete catlogue (irreversible)',
                    confirmHandler: () => this.handleDelete({ id: this.$route.params.ctlg_id, property: 'catalogues', catalog: this.$route.params.ctlg_id }),
                  },
                }
                $('#modal').modal({ show: true })
              },
            },
            {
              name: 'Edit Catalog',
              onlyAuthorizedDatasetPage: true,
              disabled: !this.isLocatedOnAuthorizedCatalogPage,
              to: {
                name: 'DataProviderInterface-Edit',
                params: {
                  catalog: this.$route.params.ctlg_id ? this.$route.params.ctlg_id : 'undefined',
                  property: 'catalogues',
                  id: this.getID || 'undefined',
                },
                query: {
                  draft: false,
                  locale: this.$route.query.locale,
                },
              },
            },
          ],
        },
      ]
    },
    menuItems() {
      return [
        {
          name: this.$t('message.dataupload.menu.draftDatasets'),
          to: { name: 'DataProviderInterface-Draft', query: { locale: this.$route.query.locale } },
        },
        {
          name: 'My Catalogues',
          to: { name: 'DataProviderInterface-UserCatalogues', query: { locale: this.$route.query.locale } },
        },
        {
          name: 'User profile',
          to: { name: 'DataProviderInterface-UserProfile', query: { locale: this.$route.query.locale } },
        },
      ]
    },
    isLocatedOnAuthorizedDatasetPage() {
      // Never return true while loading
      if (this.getLoading)
        return false

      // Is the user located on the correct page?
      const isOnDatasetDetailsPage = this.$route.name === 'DatasetDetailsDataset'
      if (!isOnDatasetDetailsPage)
        return false
      const datasetId = isOnDatasetDetailsPage && this.$route.params.ds_id

      // Does user have permission on dataset (based on current datasetDetails state)?
      const permissions = this.getUserData && this.getUserData.permissions
      const catalogId = this.getCatalog && this.getCatalog.id
      const hasPermission = permissions.find(permission => permission.rsname === catalogId)

      // Does the user have permission on the current dataset details page?
      return hasPermission
        && isOnDatasetDetailsPage
        && datasetId === this.getID
    },
    isLocatedOnAuthorizedCatalogPage() {
      // never return true while loading
      if (this.getLoading)
        return false

      // is the user located on the correct page?
      const onCatalogPage = this.$route.name === 'CatalogueDetails'
      if (!onCatalogPage)
        return false
      const catalogId = onCatalogPage && this.$route.params.ctlg_id

      const permissions = this.getUserData && this.getUserData.permissions
      const hasPermission = permissions.find(permission => permission.rsname === catalogId)

      // does user have permission on current catalogue
      return hasPermission && onCatalogPage
    },
  },
  methods: {
    ...mapActions('auth', [
      'updateUserData',
    ]),
    ...mapActions('snackbar', [
      'showSnackbar',
    ]),
    setupKeycloakWatcher() {
      if (this.$keycloak && this.$keycloak.authenticated) {
        // Set up watcher here since we this.$keycloak might not be available.
        // If this.$keycloak is ensured, move this watcher out of this created hook.
        this.$watch('$keycloak.token', async (newToken) => {
          if (!newToken)
            return

          let rtpToken = this.$keycloak.rtpToken
          if (!rtpToken) {
            const rtpTokenFn = this.$keycloak.getRtpToken
            if (rtpTokenFn) {
              const res = (await rtpTokenFn({ autoRefresh: true }))
              rtpToken = res
            }
          }

          this.updateUserData({
            authToken: newToken,
            rtpToken,
            hubUrl: this.$env.api.hubUrl,
          })
        }, { immediate: true })

        this.$watch('$keycloak.rtpToken', (newRtpToken) => {
          if (!newRtpToken)
            return

          this.updateUserData({
            authToken: this.$keycloak.token,
            rtpToken: newRtpToken,
            hubUrl: this.$env.api.hubUrl,
          })
        })
      }
    },
    async handleConfirm(action, argsObj, { successMessage, errorMessage }) {
      this.modal.loading = true
      try {
        // Sleep for 250ms for better UX
        // this.$Progress.start();
        await new Promise(resolve => setTimeout(resolve, 250))

        // this.$Progress.set(25);
        await this.$store.dispatch(action, argsObj)

        // Successful DOI registration
        this.showSnackbar({
          message: successMessage,
          variant: 'success',
        })
        await new Promise(resolve => setTimeout(resolve, 250))

        // this.$Progress.finish();
      }
      catch (ex) {
        // this.$Progress.fail();

        console.error(ex)

        const maybeErrorStatusMsg = ex.response && ex.response.data && ex.response.data.message

        let customErrorMessage = typeof errorMessage === 'string' && errorMessage
        customErrorMessage = typeof errorMessage === 'function' && errorMessage(ex)
        customErrorMessage = typeof errorMessage === 'object' && errorMessage.prefix && `${errorMessage.prefix}${maybeErrorStatusMsg && ` — ${maybeErrorStatusMsg}`}`

        const errorMsg = customErrorMessage || maybeErrorStatusMsg || ex.message || 'An error occurred'
        // show snackbar
        this.showSnackbar({
          message: errorMsg,
          variant: 'error',
        })
      }
      finally {
        this.modal.loading = false
        $('#modal').modal('hide')
      }
    },
    async handleRegisterDoi({ id, catalog, type = 'eu-ra-doi' }) {
      await this.handleConfirm(
        'auth/createPersistentIdentifier',
        { id, catalog, type },
        {
          successMessage: this.$te('message.snackbar.doiRegistration.success') ? this.$t('message.snackbar.doiRegistration.success') : 'Successfully registered DOI',
          errorMessage: { prefix: this.$te('message.snackbar.doiRegistration.error') ? this.$t('message.snackbar.doiRegistration.error') : 'DOI registration failed' },
        },
      )
    },
    async handleMarkAsDraft({
      id,
catalog,
title,
description,
    }) {
      await this.handleConfirm('auth/putDatasetToDraft', {
        id,
        catalog,
        title,
        description,
      }, {
        successMessage: this.$te('message.snackbar.markAsDraft.success') ? this.$t('message.snackbar.markAsDraft.success') : 'Dataset successfully marked as draft',
        errorMessage: { prefix: this.$te('message.snackbar.markAsDraft.error') ? this.$t('message.snackbar.markAsDraft.error') : 'Failed to mark dataset as draft' },
      })

      this.$router.push({ name: 'DataProviderInterface-Draft', query: { locale: this.$route.query.locale } }).catch(() => { })
    },
    async handleDelete({ id, property, catalog }) {
      // todo: create user dataset api (and maybe integrate to store)
      // For now, do request manually using axios

      this.modal.loading = true
      // this.$Progress.start();
      try {
        let endpoint

        if (property === 'datasets') {
          endpoint = `${this.$env.api.hubUrl}datasets/${id}?useNormalizedId=true&catalogue=${catalog}`
        }
        else if (property === 'catalogues') {
          endpoint = `${this.$env.api.hubUrl}catalogues/${id}`
        }

        await axios.delete(endpoint, {

          headers: {
            'Content-Type': 'text/turtle',
            'Authorization': `Bearer ${this.getUserData.rtpToken}`,
          },
        })

        let successMessage
        if (property === 'datasets') {
          successMessage = this.$te('message.snackbar.deleteDataset.success') ? this.$t('message.snackbar.deleteDataset.success') : 'Dataset successfully deleted'
        }
        else if (property === 'catalogues') {
          successMessage = this.$te('message.snackbar.deleteCatalog.success') ? this.$t('message.snackbar.deleteCatalog.success') : 'Catalog successfully deleted'
        }

        this.showSnackbar({
          message: successMessage,
          variant: 'success',
        })
        // this.$Progress.finish();

        // Redirect to Home
        this.$router.push({ name: 'Datasets', query: { locale: this.$route.query.locale, refresh: true } }).catch(() => { })
      }
      catch (ex) {
        // this.$Progress.fail();

        let errorMessage

        if (property === 'datasets') {
          errorMessage = this.$te('message.snackbar.deleteDataset.error') ? this.$t('message.snackbar.deleteDataset.error') : 'Failed to delete dataset'
        }
        else if (property === 'catalogues') {
          errorMessage = this.$te('message.snackbar.deleteCatalog.error') ? this.$t('message.snackbar.deleteCatalog.error') : 'Failed to delete catalog'
        }

        this.showSnackbar({
          message: `${errorMessage}${ex.response?.data ? ` — ${ex.response?.data}` : ex.message}`,
          variant: 'error',
        })
      }
      finally {
        this.modal.loading = false
        $('#modal').modal('hide')
      }
    },
  },
  created() {
    this.setupKeycloakWatcher()
  },
}
</script>

<template>
  <div id="wrapper" data-cy="dpi-menu">
    <nav v-if="visible">
      <div>
        <h4 class="text-white">
          {{ $t('message.dataupload.menu.dpi') }}
        </h4>
      </div>

      <div style="margin-top:1%;">
        <Dropup
          v-for="(group, index) in menuGroups" :key="`Group${index}`" :group-name="group.group" :group-items="group.items"
          :show="$env.content.dataProviderInterface.buttons[group.group]" :is-operator="getUserData.roles.includes('operator')"
          :is-catalog="group.group === 'Catalogue' ? true : false" @click="scrollToTop()"
        />
        <ul>
          <div class="btn-group dropup">
            <li v-for="(menuItem, index) in menuItems" :key="`Menu${index}`">
              <button type="button" class="btn btn-default" @click="scrollToTop()">
                <!-- Menu items are either buttons or router-link -->
                <!-- depending if they have a 'to' or 'handler' property -->
                <component
                  :is="menuItem.handler ? 'button' : 'router-link'" :class="{ disabled: menuItem.disabled }"
                  :to="menuItem.to" @click.native="menuItem.handler ? menuItem.handler() : null"
                >
                  {{ menuItem.handler }}
                  {{ menuItem.name }}
                </component>
              </button>
            </li>
          </div>
        </ul>
      </div>

      <div v-if="getUserData.userName">
        <slot name="right" :get-user-data="getUserData">
          <small class="text-white">{{ $t('message.dataupload.menu.loggedInAs') }} {{ getUserData.userName }}</small><br>
          <button type="button" class="btn btn-default logout">
            <router-link :to="{ name: 'Logout' }">
              {{ $t('message.dataupload.menu.logout') }}
            </router-link>
          </button>
        </slot>
      </div>
    </nav>

    <app-confirmation-dialog
      id="DPIMenuModal" :loading="modal.loading" :confirm="modal.confirm"
      @confirm="modal.confirmHandler"
    >
      {{ modal.message }}
    </app-confirmation-dialog>
  </div>
</template>

<style lang="scss" scoped>
#wrapper {
  background: #196fd2;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 999;
}

nav {
  max-width: 1400px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: space-between;
  font-size: 1rem;
  align-items: center;
}

ul {
  float: right;

  li {
    display: inline;

    a {
      color: white;
    }
  }
}

button a {
  color: white;
}

.logout {
  display: block;
  margin: 0 auto;
  border: 1px solid white;
  padding: 0.1rem 1.5rem;
}
</style>
