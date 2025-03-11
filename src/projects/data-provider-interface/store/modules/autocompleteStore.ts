// @ts-nocheck

import axios from 'axios'
import generalDpiConfig from '../../config/dpi-spec-config.js'

const state = {}
const getters = {}

const actions = {
  requestFirstEntrySuggestions({ commit }, voc, base) {
    const baseMaybeTrailingSlash = base.endsWith('/') ? base : `${base}/`
    return new Promise((resolve, reject) => {
      const req = `${baseMaybeTrailingSlash}search?filter=vocabulary&vocabulary=${voc}`
      axios.get(req)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  requestAutocompleteSuggestions({ commit }, { voc, text, base }) {
    // console.log(voc,text,base);
    return new Promise((resolve, reject) => {
      const baseMaybeTrailingSlash = base.endsWith('/') ? base : `${base}/`
      const req = `${baseMaybeTrailingSlash}search?filter=vocabulary&vocabulary=${voc}&q=${text}`
      axios.get(req)
        .then((res) => {
          // console.log(res);

          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  async requestResourceName({ commit }, { voc, uri, envs }) {
    try {
      const specification = envs.content.dataProviderInterface.specification

      // Catching invalid URI's
      if (voc === undefined)
        return
      if (voc === 'application')
        return

      let req

      // vocabularies for spdx checksum and inana-media-types are structured differently in the backend then other vocabularies
      if (voc === 'iana-media-types' || voc === 'spdx-checksum-algorithm') {
        req = `${envs.api.baseUrl}vocabularies/${voc}`
      }
      else {
        const value = encodeURIComponent(uri.replace(generalDpiConfig[specification].vocabPrefixes[voc], ''))
        req = `${envs.api.baseUrl}vocabularies/${voc}/${value}`
      }
      return new Promise((resolve, reject) => {
        axios.get(req)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
    catch (error) {
      // console.log(error);

    }
  },
}

const mutations = {}

const autocompleteModule = {
  state,
  getters,
  actions,
  mutations,
}

export default autocompleteModule
