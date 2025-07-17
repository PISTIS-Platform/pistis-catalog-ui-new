export default {
  appUrl: 'http://localhost:5173',
  keycloakUrl: import.meta.env.VITE_AUTHENTICATION_KEYCLOAK_URL || 'https://auth.pistis-market.eu/auth',
  keycloakRealm: import.meta.env.VITE_AUTHENTICATION_KEYCLOAK_REALM || 'PISTIS',
  keycloakClientId: import.meta.env.VITE_AUTHENTICATION_KEYCLOAK_CLIENT_ID || 'fhg-ui-test',
  supersetUrl: 'https://superset.mainz.dksr.city',
  piveauHubSearchUrl: import.meta.env.VITE_API_HUB_SEARCH_URL || 'https://develop.pistis-market.eu/srv/search/',
  piveauHubRepoUrl: import.meta.env.VITE_API_HUB_REPO_URL || 'https://develop.pistis-market.eu/srv/repo/',
  piveauHubStoreUrl: import.meta.env.VITE_API_HUB_STORE_URL || 'https://develop.pistis-market.eu/srv/store/',
  // piveauHubSearchUrl: import.meta.env.VITE_API_HUB_SEARCH_URL || 'https://data.europa.eu/api/hub/search/',
  // piveauHubRepoUrl: import.meta.env.VITE_API_HUB_REPO_URL || 'https://data.europa.eu/api/hub/repo/',
  // piveauHubStoreUrl: import.meta.env.VITE_API_HUB_STORE_URL || 'https://data.europa.eu/api/hub/store/',
  piveauSparqlUrl: 'https://data.europa.eu/sparql',
  pistisMode: import.meta.env.VITE_API_PISTIS_MODE ||'cloud',
  appHeader: {
    logoFileName: 'hof-logo.jpg',
    headerTitle: '|   Datenraum Landkreis Hof',
    userMenu: {
      first: {
        translationKey: 'city-os.layout.app-header-dropdown.user-profile',
        urlTarget: '/app/user-profile',
      },
      second: {
        translationKey: 'city-os.layout.app-header-dropdown.personal-settings',
        urlTarget: '/app/user-profile',
      },
      third: {
        translationKey: 'city-os.layout.app-header-dropdown.data-exchange',
        urlTarget: '/app/data-catalog/data-exchange',
      },
      fourth: {
        translationKey: 'city-os.layout.app-header-dropdown.my-work',
        urlTarget: '',
      },
      fifth: {
        translationKey: 'city-os.layout.app-header-dropdown.user-management',
        urlTarget: '',
        requiresRole: 'administrator',
      },
      sixth: {
        translationKey: 'city-os.layout.app-header-dropdown.legal-notices',
        urlTarget: '/app/data-notices',
      },
    },
  },
  components: {
    headerImageFileName: 'city-of-mainz.jpeg',
  },
  dashboard: {
    username: 'admin',
    password: 'V1xp67F5rrqQMd8BSeXnRPbuW1IWul',
    embeddableDashboardId: '5e35d2ca-8a4b-44da-b5e9-d4f14bda90fd',
  },
  oup: {
    url: '',
    username: '',
    password: '',
  },
  homeQuickLinks: {
    first: {
      title: '',
      subtitle: '',
      icon: '',
      route: '',
    },
    second: {
      title: '',
      subtitle: '',
      icon: '',
      route: '',
    },
    third: {
      title: '',
      subtitle: '',
      icon: '',
      route: '',
    },
  },
  languages: {
    displayOptions: 'de,cs,en',
    fallbackLanguage: 'cs',
  },
}
