<script>
/* eslint-disable no-extra-boolean-cast */
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    name: {
      type: String,
    },
    format: {
      type: String,
    },
  },
  data() {
    return {
      loading: true,
      linkedData: '',
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getUserData',
    ]),
    isLoading() {
      return this.loading
    },
    url() {
      const hubUrl = this.$env.api.hubUrl?.endsWith('/') ? this.$env.api.hubUrl.slice(0, -1) : this.$env.api.hubUrl
      return `${hubUrl}drafts/datasets/${this.name}.${this.format}?useNormalizedId=true&locale=${this.$route.query.locale}&catalogue=${this.$route.query.catalogue}`
    },
  },
  methods: {
    ...mapActions('snackbar', [
      'showSnackbar',
    ]),
    setupLinkedDataViewer() {
      if (!!this.url) {
        this.loadLinkedData()
          .then((res) => {
            this.loading = false
            this.linkedData = this.format === 'jsonld'
              ? JSON.stringify(res.data, null, 2)
              : res.data

            this.$nextTick(() => {
              // Resize textarea to fit text
              const tx = document.getElementsByTagName('textarea')
              for (let i = 0; i < tx.length; i++) tx[i].setAttribute('style', `height:${tx[i].scrollHeight}px;overflow-y:hidden;`)
            })
          })
      }
    },
    loadLinkedData() {
      return new Promise((resolve, reject) => {
        const req = this.url
        axios.get(req, {
          headers: {
            Authorization: `Bearer ${this.getUserData.rtpToken}`,
          },
        })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    handleCopy(text) {
      navigator.clipboard.writeText(text)
      this.showSnackbar({
        message: 'Text successfully copied',
        variant: 'success',
      })
    },
    handleDownload(text) {
      const element = document.createElement('A')
      element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`)
      element.setAttribute('download', `${this.name}.${this.format}`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
  },
  created() {
    this.setupLinkedDataViewer()
  },
}
</script>

<template>
  <div class="d-flex flex-column container-fluid justify-content-between content bg-transparent">
    <div v-if="isLoading" class="loading-spinner ml-3" />
    <div v-else>
      <div class="d-flex justify-content-between">
        <h1 class="d-inline">
          {{ name }}
        </h1>
        <div>
          <button type="button" class="btn btn-secondary" @click="handleCopy(linkedData)">
            Copy
          </button>
          <button type="button" class="btn btn-primary" @click="handleDownload(linkedData)">
            Download
          </button>
        </div>
      </div>
      <textarea v-model="linkedData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
textarea {
  width: 100%;
}
</style>
