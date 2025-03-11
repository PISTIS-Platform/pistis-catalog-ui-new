export default {
  appUrl: 'http://localhost:5173',
  keycloakUrl: 'https://hoferland-digital.de/auth/',
  keycloakRealm: 'city-os',
  keycloakClientId: 'city-os',
  supersetUrl: 'https://superset.hoferland-digital.de',
  piveauHubSearchUrl: 'https://piveau.hof-staging.dksr.city/api/hub/search',
  piveauHubRepoUrl: 'https://piveau.hof-staging.dksr.city/api/hub/repo',
  piveauHubStoreUrl: 'https://piveau.hof-staging.dksr.city/api/hub/store',
  piveauSparqlUrl: 'https://piveau.hof-staging.dksr.city/api/sparql',
  digitalTwinUrl: 'https://dz.hoferland-digital.de/',
  middlewareUrl: 'https://middleware.mainz-staging.dksr.city',
  customer: {
    name: 'hof',
    primaryColor: '#05356D',
    landingPagePublic: 'false',
    requiresLogin: 'false',
    modules: {
      home: {
        available: 'true',
        order: '1',
        requiresLogin: 'false',
        widgets: 'orgnews,news',
      },
      dashboards: {
        available: 'true',
        order: '3',
        requiresLogin: 'false',
      },
      organisationSites: {
        available: 'false',
        order: '5',
        requiresLogin: 'false',
      },
      dataCatalog: {
        available: 'true',
        order: '4',
        requiresLogin: 'false',
      },
      digitalTwin: {
        available: 'true',
        order: '2',
        requiresLogin: 'false',
      },
      dksrApps: {
        available: 'true',
        order: '6',
        requiresLogin: 'false',
      },
    },
  },
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
    headerImageFileName: 'hof-lp-header-background.jpg',
  },
  dashboard: {
    username: 'cityosappuser',
    password: 'cityosapp',
    embeddableDashboardId: '',
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
