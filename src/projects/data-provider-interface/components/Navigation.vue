<script>
import { useWindowScroll } from '@vueuse/core'
import axios from 'axios'
import $ from 'jquery'
import { isNil } from 'lodash-es'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  props: ['steps', 'nextStep', 'previousStep', 'goToNextStep', 'goToPreviousStep'],
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
      uploading: {
        dataset: false,
        draft: false,
      },
      modal: {
        confirm: '',
        message: '',
        callback: '',
      },
      modals: {
        id: {
          confirm: '',
          message: 'Dataset ID already exists',
          callback: this.closeModal,
        },
        clear: {
          head: 'Hinweis',
          confirm: 'Fortfahren',
          message: 'Dein Fortschritt wird gelöscht. Fortfahren?',
          callback: this.clearStorage,
        },
        // deleteDistribution: {
        //   confirm: 'Delete Distribution',
        //   message: 'Are you sure you want to delete the distribution? The whole content will be deleted permanently!',
        //   callback: this.deleteCurrentDistribution,
        // }
      },
      property: this.$route.params.property,
      id: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getIsEditMode',
      'getIsDraft',
      'getUserData',
    ]),
    ...mapGetters('dpiStore', [
      'getData',
    ]),
    formErrorCount() {
      let errorCount = 0
      Object.keys(this.steps).forEach((key) => {
        errorCount = errorCount + this.steps[key].blockingCount
      })

      return errorCount > 0
    },
  },
  methods: {
    ...mapActions('auth', [
      'setIsEditMode',
      'setIsDraft',
    ]),
    ...mapActions('snackbar', [
      'showSnackbar',
    ]),
    ...mapActions('dpiStore', [
      'convertToRDF',
      'clearAll',
      // 'deleteDistribution',
      // 'setDeleteDistributionInline',
    ]),
    closeModal() {
      $('#modal').modal('hide')
    },
    handleIDError() {
      this.modal = { ...this.modals.id }
      $('#modal').modal({ show: true })
    },
    handleClear() {
      this.modal = { ...this.modals.clear }
      $('#modal').modal({ show: true })
    },
    clearStorage() {
      this.closeModal()
      this.$formkit.reset('dpiForm')
      this.clearAll()
    },
    async submit(mode) {
      this.uploading[mode] = true
      // this.$Progress.start();

      const specification = this.$env.content.dataProviderInterface.specification
      const RDFdata = await this.convertToRDF({ property: this.property, specification }).then((response) => { return response })
      const rtpToken = this.getUserData.rtpToken

      const datasetId = this.getData(this.property).datasetID
      const title = this.getData(this.property)['dct:title']
      const description = this.getData(this.property)['dct:description']
      const catalogName = this.getData(this.property)['dcat:catalog'] ? this.getData(this.property)['dcat:catalog'] : ''

      let uploadUrl
      let actionName
      let actionParams = {
        id: datasetId,
        catalog: catalogName,
        body: RDFdata,
        title,
        description,
      }

      const maybeTrailingSlash = this.$env.api.hubUrl.endsWith('/') ? '' : '/'
      const hubUrl = this.$env.api.hubUrl + maybeTrailingSlash

      if (mode === 'dataset') {
        // if no edit mode: just publish dataset regularly
        // if edit mode but no draft: publish/save dataset regularly
        if (!this.getIsEditMode || (this.getIsEditMode && !this.getIsDraft)) {
          uploadUrl = `${hubUrl}datasets?id=${datasetId}&catalogue=${catalogName}`
          actionParams = { data: RDFdata, token: rtpToken, url: uploadUrl }
          actionName = 'auth/createDataset'
        }
        else {
          // if edit mode and draft: publish user draft (remove from draft database and add to dataset database)-> publishUserDraftById
          actionParams = { id: datasetId, catalog: catalogName }
          actionName = 'auth/publishUserDraftById'
        }
      }
      else if (mode === 'draft') {
        // if no edit mode: save draft regularly
        // if edit mode and draft: save draft regularly
        if (!this.getIsEditMode || (this.getIsEditMode && this.getIsDraft)) {
          uploadUrl = `${hubUrl}drafts/datasets/${datasetId}?catalogue=${catalogName}`
          actionName = 'auth/createUserDraft'
        }
        else {
          // if edit mode and no draft: save dataset as draft (remove from dataset database and add to draft database)-> putDatasetToDraft
          actionParams = { id: datasetId, catalog: catalogName, title, description }
          actionName = 'auth/putDatasetToDraft'
        }
      }
      else if (mode === 'createcatalogue') {
        uploadUrl = `${hubUrl}catalogues/${datasetId}`
        actionParams = { data: RDFdata, token: rtpToken, url: uploadUrl, id: datasetId }
        actionName = 'auth/createCatalogue'
      }

      try {
        // Dispatch the right action depending on the mode

        const idIsUnqiue = this.idunique(datasetId)

        if (idIsUnqiue) {
          await this.$store.dispatch(actionName, actionParams)
          await new Promise(resolve => setTimeout(resolve, 250))

          // this.$Progress.finish();
          // this.uploading = false;

          if (mode === 'createcatalogue')
            this.createCatalogue(datasetId)
          if (mode === 'dataset')
            this.createDataset(datasetId)
          if (mode === 'draft')
            this.createDraft()

          // store needs to be reset
          this.clearAll()
        }
        else {
          this.uploading[mode] = false
          // this.$Progress.fail();
          this.handleIDError()
        }
      }
      catch (err) {
        this.uploading[mode] = false
        // this.$Progress.fail();
        this.showSnackbar({ message: 'Network Error', variant: 'error' })
      }
    },
    createDataset(datasetId) {
      this.clearAll()
      // this.showSnackbar({ message: 'Dataset published successfully', variant: 'success' });
      this.$router.push({ name: 'datasets-detail', params: { datasetId } })
    },
    createDraft() {
      this.clearAll()
      this.showSnackbar({ message: 'Draft saved successfully', variant: 'success' })
      this.$router.push({ name: 'DataProviderInterface-Draft', query: { locale: this.$route.query.locale } }).catch(() => { })
    },
    createCatalogue(datasetId) {
      this.clearAll()
      this.showSnackbar({ message: 'Catalogue saved successfully', variant: 'success' })
      this.$router.push({ name: 'CatalogueDetails', query: { locale: this.$route.query.locale }, params: { ctlg_id: datasetId } }).catch(() => { })
    },
    async idunique(id) {
      let isUniqueID = true

      const draftIDs = this.$store.getters['auth/getUserDraftIds']

      new Promise(() => {
        if (isNil(id) || id === '' || id === undefined) {
          isUniqueID = true
        }
        else if (draftIDs.includes(id)) {
          isUniqueID = false
        }
        else {
          // TODO: insert env hubUrl
          const maybeTrailingSlash = this.$env.api.hubUrl.endsWith('/') ? '' : '/'
          const hubUrl = this.$env.api.hubUrl + maybeTrailingSlash
          const request = `${hubUrl}datasets/${id}?useNormalizedId=true`
          axios.head(request)
            .then(() => {
              isUniqueID = false
            })
            .catch((e) => {
              isUniqueID = true
            })
        }
      })
      return isUniqueID
    },
  },
}
</script>

<template>
  <div>
    <div id="nav" class="d-flex ">
      <div class="left-form-nav w-25">
        <!-- PREVIOUS STEP -->
        <FormKit
          v-if="previousStep" type="button" :label="$t('message.dataupload.preview')" class="prev-btn mx-1 my-0"
          @click="goToPreviousStep"
        />

        <!-- CLEAR FORM -->
        <FormKit type="button" :label="$t('message.dataupload.clear')" class="clear-btn" @click="handleClear" />
      </div>
      <div class="right-form-nav w-75">
        <!-- DELETE DISTRIBUTION -->
        <!-- <FormKit type="button" label="Delete Distribution" @click="handleDeleteDistribution()"
          v-if="isDistribution" class="mx-1 my-0 delDisBtn"></FormKit> -->

        <!-- PUBLISH NEW CATALOGUE -->
        <FormKit
          v-if="!getIsEditMode && !getIsDraft && property === 'catalogues'" type="button"
          class="mr-2" @click="submit('createcatalogue')"
        >
          <span v-if="uploading.createcatalogue" class="loading-spinner" />{{
            $t('message.dataupload.publishcatalogue') }}
        </FormKit>

        <!-- PUBLISH EDITED CATALOGUE -->
        <FormKit
          v-if="getIsEditMode && !getIsDraft && property === 'catalogues'" type="button"
          class="mx-1 my-0" @click="submit('createcatalogue')"
        >
          <span v-if="uploading.createcatalogue" class="loading-spinner" />{{
            $t('message.dataupload.publishcatalogue') }}
        </FormKit>

        <!-- PUBLISH DATASET -->
        <FormKit type="button" :disabled="formErrorCount" class="mx-1 my-0" @click="submit('dataset')">
          <span v-if="uploading.dataset" class="loading-spinner" />{{ $t('message.dataupload.publishdataset') }}
        </FormKit>

        <!-- SAVE AS DRAFT -->
        <FormKit type="button" :disabled="formErrorCount" class="mx-1 my-0" @click="submit('draft')">
          <span v-if="uploading.draft" class="loading-spinner" />{{ $t('message.dataupload.saveasdraft') }}
        </FormKit>

        <!-- NEXT STEP -->
        <FormKit v-if="nextStep" type="button" :label="$t('message.dataupload.next')" @click="goToNextStep" />
      </div>
    </div>

    <app-confirmation-dialog id="modal" :confirm="modal.confirm" :head="modal.head" @confirm="modal.callback">
      {{ modal.message }}
    </app-confirmation-dialog>
  </div>
</template>

<style lang="scss">
// @import '../../../styles/bootstrap_theme';
// @import '../../../styles/utils/css-animations';
</style>
