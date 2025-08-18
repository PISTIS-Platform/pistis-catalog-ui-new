import type { InjectionKey, Plugin } from 'vue'

import appConfig from '../../../../config/appConfig.js'

import AppConfirmationDialog from '../modal/AppConfirmationDialog.vue'

const userConfig = {
  api: {
    // baseUrl: 'https://data.europa.eu/api/hub/search/',
    // baseUrl: 'https://ppe.data.europa.eu/api/hub/search/',
    // baseUrl: 'https://piveau-hub-search-piveau.apps.osc.fokus.fraunhofer.de/',
    baseUrl: `${appConfig.appUrl.endsWith('/') ? appConfig.appUrl : `${appConfig.appUrl}/`}`,

    // hubUrl: 'https://data.europa.eu/api/hub/repo/',
    // hubUrl: 'https://ppe.data.europa.eu/api/hub/repo/',
    // hubUrl: appConfig.piveauHubRepoUrl,
    hubUrl: `${appConfig.hubUrl.endsWith('/') ? appConfig.hubUrl : `${appConfig.hubUrl}/`}`,

    // qualityBaseUrl: 'https://data.europa.eu/api/mqa/cache/',
    // qualityBaseUrl: 'https://ppe.data.europa.eu/api/mqa/cache/',
    qualityBaseUrl: 'https://piveau-metrics-cache-piveau.apps.osc.fokus.fraunhofer.de/',

    // similarityBaseUrl: 'https://data.europa.eu/api/similarities/',
    // similarityBaseUrl: 'https://ppe.data.europa.eu/api/similarities/',
    similarityEndpoint: 'similarities',
    similarityBaseUrl: 'https://piveau-metrics-dataset-similarities-piveau.apps.osc.fokus.fraunhofer.de/',

    similarityServiceName: 'similarity',

    // fileUploadUrl: 'https://data.europa.eu/api/hub/store/',
    // fileUploadUrl: 'https://ppe.data.europa.eu/api/hub/store/',
    // fileUploadUrl: `${appConfig.piveauHubStoreUrl.endsWith('/') ? appConfig.piveauHubStoreUrl : `${appConfig.piveauHubStoreUrl}/`}`,

    sparqlUrl: 'https://data.europa.eu/sparql',
    gazetteerBaseUrl: 'https://data.europa.eu/api/hub/search/gazetteer/',
    corsproxyApiUrl: 'https://piveau-corsproxy-piveau.apps.osc.fokus.fraunhofer.de',
  },
  authentication: {
    useService: true,
    login: {
      useLogin: true,

      loginTitle: 'Login',
      loginURL: '/login',
      loginRedirectUri: '/',

      logoutTitle: 'Logout',
      logoutURL: '/logout',
      logoutRedirectUri: '/',
    },
    keycloak: {
      'realm': 'vanilla',
      'clientId': 'piveau-hub-ui',
      'url': 'https://demo.piveau.io/auth',

      // TODO: Do we need to include these properties? They seem to be default values that never change #2763
      'ssl-required': 'external',
      'public-client': true,
      'verify-token-audience': true,
      'use-resource-role-mappings': true,
      'confidential-port': 0,
    },
    keycloakInit: {
      pkceMethod: '',
    },
    rtp: {
      grand_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      audience: 'piveau-hub-repo',
    },
    authToken: '',
  },
  routing: {
    routerOptions: {
      base: '/',
      mode: 'history',
    },
    navigation: {
      showSparql: false,
    },
    pagination: {
      usePagination: true,
      usePaginationArrows: true,
      useItemsPerPage: true,
      defaultItemsPerPage: 10, // TODO: Make use of this property #2764
      defaultItemsPerPageOptions: [5, 10, 25, 50],
    },
  },
  metadata: {
    title: 'piveau Hub-UI',
    description: 'A modern and customizable web application for data management of extensive data catalogs.',
    keywords: 'Open Data',
  },
  content: {
    datasets: {
      useSort: true,
      useFeed: true,
      useCatalogs: true,
      followKeywordLinks: 'nofollow',
      maxKeywordLength: 15,
      facets: {
        useDatasetFacets: true,
        useDatasetFacetsMap: false,
        showClearButton: false,
        showFacetsTitle: false,
        cutoff: 5,
        MIN_FACET_LIMIT: 10,
        MAX_FACET_LIMIT: 50,
        FACET_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        FACET_GROUP_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        defaultFacetOrder: ['publisher', 'format', 'catalog', 'categories', 'keywords', 'dataScope', 'country', 'dataServices', 'scoring', 'license'],
        scoringFacets: {
          useScoringFacets: true, // TODO: Make use of this property #2764
          defaultScoringFacets: {
            excellentScoring: {
              id: 'excellentScoring',
              title: 'Excellent',
              count: 0,
              minScoring: 351,
              maxScoring: 405,
            },
            goodScoring: {
              id: 'goodScoring',
              title: 'Good',
              count: 0,
              minScoring: 221,
              maxScoring: 350,
            },
            sufficientScoring: {
              id: 'sufficientScoring',
              title: 'Sufficient',
              count: 0,
              minScoring: 121,
              maxScoring: 220,
            },
            badScoring: {
              id: 'badScoring',
              title: 'Any',
              count: 0,
              minScoring: 0,
              maxScoring: 120,
            },
          },
        },
      },
    },
    catalogs: {
      useSort: true, // TODO: Make use of this property #2764
      useCatalogCountries: true,
      defaultCatalogImagePath: '/flags',
      defaultCatalogCountryID: 'eu',
      defaultCatalogID: 'european-union-open-data-portal',
      facets: {
        useCatalogFacets: true,
        showClearButton: false,
        showFacetsTitle: false,
        cutoff: 5,
        MIN_FACET_LIMIT: 50,
        MAX_FACET_LIMIT: 100,
        FACET_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        FACET_GROUP_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        defaultFacetOrder: ['country'],
      },
    },
    datasetDetails: {
      properties: '',
      header: {
        navigation: 'top',
        hidePublisher: false,
        hideDate: false,
      },
      keywords: {
        isVisible: true,
        showTitle: true,
        collapsed: false, // displayAll
      },
      categoriesKey: {
        isVisible: true,
        collapsed: false, // displayAll
      },
      description: {
        enableMarkdownInterpretation: true,
      },
      distributions: {
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
        showValidationButton: true,
        hidePreviewButton: true,
      },
      downloadAs: {
        enable: true,
        proxyUrl: 'https://piveau-corsproxy-piveau.apps.osc.fokus.fraunhofer.de',
        url: 'https://piveau-fifoc-piveau.apps.osc.fokus.fraunhofer.de/v1/convert',
        conversionFormats: [
          { sourceFileFormat: 'HTML', targetFileFormat: ['html', 'pdf', 'docx', 'json', 'odt', 'rtf'] },
          { sourceFileFormat: 'CSV', targetFileFormat: ['csv', 'docx', 'html', 'json', 'odt', 'rtf', 'xls', 'xlsx', 'xml'] },
          { sourceFileFormat: 'JSON', targetFileFormat: ['json', 'xml'] },
          { sourceFileFormat: 'ODT', targetFileFormat: ['odt', 'docx', 'html', 'json', 'rtf'] },
          { sourceFileFormat: 'DOCX', targetFileFormat: ['docx', 'pptx', 'odt', 'pdf', 'txt', 'html', 'json', 'odt', 'rtf'] },
          { sourceFileFormat: 'XLSX', targetFileFormat: ['xlsx', 'csv'] },
          { sourceFileFormat: 'XLS', targetFileFormat: ['xls', 'csv'] },
          { sourceFileFormat: 'PDF', targetFileFormat: ['pdf', 'txt'] },
        ],
      },
      embed: {
        enable: false,
        defaultWidth: 900,
        defaultHeight: 600,
        minRange: 0,
        maxRange: 9999,
      },
      similarDatasets: {
        breakpoints: {
          verySimilar: { start: 0, end: 20 },
          similar: { start: 20, end: 25 },
          lessSimilar: { start: 25, end: 35 },
        },
      },
      pages: {
        isVisible: false,
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
      },
      visualisations: {
        isVisible: false,
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
      },
      dataServices: {
        isVisible: true,
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
      },
      isUsedBy: {
        isVisible: false,
      },
      relatedResources: {
        isVisible: false,
      },
      bulkDownload: {
        buttonPosition: 'bottom',
        MAX_FILE_TITLE_LENGTH: 80,
        MAX_REQUESTS_COUNT: 5, // TODO: Make use of this property #2764
        INTERVAL_MS: 10, // TODO: Make use of this property #2764
        TIMEOUT_MS: 10000,
      },
      quality: {
        useQualityData: true,
        useQualityDistributionData: true,
        useDQVDataDropdown: true,
        formatsDQVData: [
          'rdf',
          'ttl',
          'n3',
          'nt',
          'jsonld',
        ],
        displayAll: false,
        numberOfDisplayedQualityDistributions: 5,
        csvLinter: {
          enable: true,
          displayAll: false,
          numberOfDisplayedValidationResults: 5,
        },
      },
    },
    maps: {
      mapVisible: false,
      useAnimation: true,
      location: [[52.526, 13.314], 10],
      spatialType: 'Point',
      height: '400px',
      width: '100%',
      mapContainerId: 'mapid',
      urlTemplate: 'https://gisco-services.ec.europa.eu/maps/wmts/1.0.0/WMTSCapabilities.xml/wmts/OSMCartoComposite/EPSG3857/{z}/{x}/{y}.png',
      geoBoundsId: 'ds-search-bounds',
      sender: {
        startBounds: [[34.5970, -9.8437], [71.4691, 41.4843]],
        height: '200px',
        width: '100%',
        mapContainerId: 'modalMap',
      },
      receiver: {
        startBounds: [[34.5970, -9.8437], [71.4691, 41.4843]],
        height: '250px',
        width: '100%',
        mapContainerId: 'mapid',
        attributionPosition: 'topright',
      },
      options: {
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiZmFiaWFwZmVsa2VybiIsImEiOiJja2x3MzlvZ3UwNG85MnBseXJ6aGI2MHdkIn0.bFs2g4bPMYULlvDSVsetJg',
        attribution: '&copy; <a href="https://ec.europa.eu/eurostat/web/gisco/">Eurostat - GISCO</a>',
      },
      mapStyle: {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.5,
        weight: 2,
        radius: 1,
      },
    },
    dataProviderInterface: {
      useService: true,
      basePath: '/dpi',
      specification: 'dcatapde',
      annifIntegration: false,
      annifLinkSubject: 'https://data.europa.eu/annif/v1/projects/eurovoc-nn-ensemble-eurlex-en/suggest',
      annifLinkTheme: 'https://data.europa.eu/annif/v1/projects/data-theme-nn-ensemble-en/suggest',
      enableFileUploadReplace: false,
      buttons: {
        Dataset: true,
        Catalogue: false,
      },
      doiRegistrationService: {
        persistentIdentifierType: 'eu-ra-doi',
      },
    },
  },
  languages: {
    useLanguageSelector: true, // TODO: Make use of this property by passing it to the Header-Footer in App.vue #2766
    locale: 'en',
    fallbackLocale: 'en',
  },
  themes: {
    header: 'dark',
  },
  tracker: {
    // TODO: Implement disable tracker option based on condition #2767
    isPiwikPro: true, // true: PiwikPro | false: Matomo
    siteId: 'fed9dbb7-42d1-4ebc-a8bf-3c0b8fd03e09',
    trackerUrl: 'https://opanalytics.containers.piwik.pro/',
  },
} as const

// add ts types
declare module 'vue' {
  interface ComponentCustomProperties {
    $env: typeof userConfig
  }
}

export const injectionKey: InjectionKey<typeof userConfig> = Symbol('userConfig')

export const userConfigShimPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$env = userConfig
    app.provide(injectionKey, userConfig)

    app.component('AppConfirmationDialog', AppConfirmationDialog)
  },
}
