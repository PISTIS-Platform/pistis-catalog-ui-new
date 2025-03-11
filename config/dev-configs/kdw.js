export default {
  appUrl: 'http://localhost:5173',
  keycloakUrl: 'https://auth.mainz.dksr.city',
  keycloakRealm: 'city-os',
  keycloakClientId: 'city-os',
  supersetUrl: 'https://superset.mainz.dksr.city',
  piveauHubSearchUrl: 'https://piveau.mainz-staging.dksr.city/api/hub/search',
  piveauHubRepoUrl: 'https://piveau.mainz-staging.dksr.city/api/hub/repo',
  piveauHubStoreUrl: 'https://piveau.mainz-staging.dksr.city/api/hub/store',
  piveauSparqlUrl: 'https://piveau.mainz-staging.dksr.city/api/sparql',
  digitalTwinUrl: 'https://www.virtualcitymap.de/',
  middlewareUrl: 'https://middleware.mainz-staging.dksr.city',
  customer: {
    name: 'kdw',
    primaryColor: '#164194',
    landingPagePublic: 'true',
    requiresLogin: 'true',
    modules: {
      home: {
        available: 'true',
        order: '1',
        requiresLogin: 'true',
        widgets: 'orgnews,news',
      },
      dashboards: {
        available: 'true',
        order: '3',
        requiresLogin: 'true',
      },
      organisationSites: {
        available: 'true',
        order: '5',
        requiresLogin: 'true',
      },
      dataCatalog: {
        available: 'true',
        order: '4',
        requiresLogin: 'true',
      },
      digitalTwin: {
        available: 'true',
        order: '2',
        requiresLogin: 'true',
      },
      dksrApps: {
        available: 'true',
        order: '6',
        requiresLogin: 'true',
      },
    },
  },
  appHeader: {
    logoFileName: 'mainz-logo-2.jpeg',
    headerTitle: 'Kommunales DatenWerk | Mainz',
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
