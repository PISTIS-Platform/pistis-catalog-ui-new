// @ts-nocheck

// config defining which properties are displayed on which page
import generalDpiConfig from '../../config/dpi-spec-config.js'

const state = {
  navigation: {
    datasets: [],
    distributions: [],
    catalogues: [],
  },
}

const getters = {
  getNavSteps: state => (specification) => {
    const dpiConfig = generalDpiConfig[specification]
    setConfig(dpiConfig)

    return state.navigation
  },
}
function setConfig(specification) {
  state.navigation.datasets = Object.keys(specification.pageConent.datasets)
  state.navigation.distributions = Object.keys(specification.pageConent.distributions)
  state.navigation.catalogues = Object.keys(specification.pageConent.catalogues)
}

const actions = {}
const mutations = {}

const navigationModule = {
  state,
  getters,
  actions,
  mutations,
}

export default navigationModule
