/**
 * Create feature project specific SDK.
 * @piveau/sdk-vue and @piveau/sdk-core provide the necessary tools
 * to create a feature project specific SDK.
 */

import type { EnhancedSearchResult } from '../composables/useDatasetsSearchView'
import { schemaCatalog, SchemaDataset } from '@piveau/sdk-core'
import { dcatApDataset, defineHubSearch, getTranslationFor } from '@piveau/sdk-vue'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'
import appConfig from '../../config/appConfig'

export function useDcatApSearch() {
  return defineHubSearch(
    {
      baseUrl: appConfig.piveauHubSearchUrl,
      index: 'dataset',
      indexDetails: 'datasets',
      schema: SchemaDataset,
      facets: [
        'categories',
        'publisher',
        'catalog',
        'format',
        'license',
        'is_hvd',
        'periodicity',
      ],
    },
    (dataset, localeInstance) => {
      const { setup: dcatApDatasetSetup } = dcatApDataset({ baseUrlHubRepo: appConfig.piveauHubRepoUrl ?? '/' })
      const baseGetters = dcatApDatasetSetup(dataset, localeInstance)

      const getCatalogId = dataset.catalog.id
      const getCatalogTitle = getTranslationFor(dataset.catalog.title, ['de'])

      const getDescriptionMarkup = DOMPurify.sanitize(marked(baseGetters.getDescription || '', { async: false }))

      const enhanced: EnhancedSearchResult = {
        getId: dataset.id || '',
        getTitle: baseGetters.getTitle || '',
        getDescription: baseGetters.getDescription || '',
        getPublisher: baseGetters.getPublisher,
        getFormats: baseGetters.getFormats || [],
        getSummary: [
          { title: 'Aktualisiert', text: baseGetters.getIssued || baseGetters.getModified || '' },
          { title: 'Kategorie', text: [...new Set(baseGetters.getCategories.map(cat => getTranslationFor(cat.label, 'de')))].join(', ') },
          { title: 'Bereitsteller', text: baseGetters.getPublisher?.name || '' },
          { title: 'Lizenz', text: baseGetters.getLicenses?.[0] || '' },
        ],
      }

      return {
        ...baseGetters,
        ...enhanced,
        getCatalogId,
        getCatalogTitle,
        getDescriptionMarkup,
      }
    },
  )
}

export function useDcatApCatalogSearch() {
  return defineHubSearch(
    {
      baseUrl: appConfig.piveauHubSearchUrl,
      index: 'catalogue',
      indexDetails: 'catalogues',
      schema: schemaCatalog,
      facets: [
        'country',
        'superCatalog',
      ],
    },
    (dataset, localeInstance) => {
      const { currentLocale: locale } = localeInstance

      const enhanced: EnhancedSearchResult = {
        getId: dataset.id || '',
        getTitle: getTranslationFor(dataset.title, [locale]) || '',
        getDescription: getTranslationFor(dataset.description, [locale]) || '',
        getPublisher: dataset.publisher,
        getFormats: [],
        getSummary: [],
      }

      return enhanced
    },
  )
}
