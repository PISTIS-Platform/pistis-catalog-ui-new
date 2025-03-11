<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['id', 'property', 'catalog'],
  data() {
    return {
      hubUrl: this.$env.api.hubUrl.endsWith('/') ? this.$env.api.hubUrl.slice(0, -1) : this.$env.api.hubUrl,
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getIsDraft',
      'getUserData',
    ]),
    token() {
      return this.getUserData.rtpToken
    },
    redirectUri() {
      return `${this.$env.content.dataProviderInterface.basePath}/${this.property}?locale=${this.$i18n.locale}`
    },
  },
  methods: {
    ...mapActions('auth', [
      'setIsEditMode',
      'setIsDraft',
    ]),
    ...mapActions('dpiStore', [
      'convertToInput',
    ]),
    async setupEditPage() {
      let endpoint
      this.setIsEditMode(true)
      const specification = this.$env.content.dataProviderInterface.specification

      if (this.getIsDraft) {
        this.setIsDraft(true)
        endpoint = `${this.hubUrl}drafts/datasets/${this.id}.nt?catalogue=${this.catalog}`
        await this.convertToInput({ endpoint, token: this.token, property: this.property, id: this.id, specification })
      }
      else {
        this.setIsDraft(false)
        if (this.property === 'catalogues') {
          endpoint = `${this.hubUrl}catalogues/${this.catalog}.nt`
          await this.convertToInput({ endpoint, token: this.token, property: this.property, id: this.catalog, specification })
        }
        else {
          endpoint = `${this.hubUrl}datasets/${this.id}.nt?useNormalizedId=true`
          await this.convertToInput({ endpoint, token: this.token, property: this.property, id: this.id, specification })
        }
      }

      this.$router.push(this.redirectUri).catch(() => {})
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.fullPath.startsWith(vm.redirectUri)) {
        vm.$router.go(-1)
      }
      else {
        vm.setupEditPage()
      }
    })
  },
}
</script>

<template>
  <div style="height:370px;">
    <div class="spinner" />
  </div>
</template>
