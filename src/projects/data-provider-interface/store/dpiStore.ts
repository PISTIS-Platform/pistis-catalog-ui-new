// @ts-nocheck

import autocompleteModule from './modules/autocompleteStore'
import conversionModule from './modules/conversionStore'
import formModule from './modules/formSchemaStore'
import navigationModule from './modules/navigationStore'

const state = {}
const getters = {}
const actions = {}
const mutations = {}

const module = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    formModule,
    autocompleteModule,
    conversionModule,
    navigationModule,
  },
}

export default module
