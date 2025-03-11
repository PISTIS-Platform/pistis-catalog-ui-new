/**
 * Create feature project specific SDK.
 * @piveau/sdk-vue and @piveau/sdk-core provide the necessary tools
 * to create a feature project specific SDK.
 */

import type { PropertyTableEntryNode } from '@piveau/sdk-vue'
import type { EnhancedSearchResult } from '../composables/useDatasetsSearchView'
import { schemaCatalog, SchemaDataset } from '@piveau/sdk-core'
import { dcatApDataset, defineHubSearch, definePropertyNode, getTranslationFor } from '@piveau/sdk-vue'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'
import appConfig from '../../config/appConfig'
import { schemaHardware, schemaOrganisation, schemaProcessSteps, schemaProject, schemaSoftware } from './schema'

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

export function useOrganizationSearch() {
  return defineHubSearch(
    {
      baseUrl: '/__mock-search',
      index: 'organizations',
      indexDetails: 'organization',
      schema: schemaOrganisation,
      facets: [
      ],
    },
    (dataset, localeInstance) => {
      const { currentLocale: locale } = localeInstance

      const enhanced: EnhancedSearchResult = {
        getId: dataset.id || '',
        getTitle:
        typeof dataset.name === 'string'
          ? dataset.name
          : getTranslationFor(dataset.name, [locale]) || dataset.id || '',
        getDescription: typeof dataset.description === 'string'
          ? dataset.description
          : getTranslationFor(dataset.description, [locale]) || '',
        getPublisher: null,
        getFormats: [],
        getSummary: [
          { text: dataset.type || '', title: 'Typ' },
          { text: dataset.location?.region || '', title: 'Zuständigkeit' },
        ],
      }

      const getPropertyTable: PropertyTableEntryNode[] = [
        definePropertyNode({ data: dataset.website || '', label: 'Webseite', id: 'website' }),
        definePropertyNode({ data: dataset.linked_projects?.map(p => p?.id).filter(Boolean) || [], label: 'Linked Projects', id: 'linked_projects' }),
        definePropertyNode({ data: dataset.linked_software?.map(p => p?.id).filter(Boolean) || [], label: 'Linked Software', id: 'linked_software' }),
        definePropertyNode({ data: dataset.linked_hardware?.map(p => p?.id).filter(Boolean) || [], label: 'Linked Hardware', id: 'linked_data' }),
      ]

      return {
        ...enhanced,
        getPropertyTable,
      }
    },
  )
}

export function useSoftwareSearch() {
  return defineHubSearch(
    {
      baseUrl: '/__mock-search',
      index: 'softwares',
      indexDetails: 'software',
      schema: schemaSoftware,
      facets: [
      ],
    },
    (dataset, localeInstance) => {
      const { currentLocale: locale } = localeInstance

      const enhanced: EnhancedSearchResult = {
        getId: dataset.id || '',
        getTitle:
        typeof dataset.name === 'string'
          ? dataset.name
          : getTranslationFor(dataset.name, [locale]) || dataset.id || '',
        getDescription: typeof dataset.description === 'string'
          ? dataset.description
          : getTranslationFor(dataset.description, [locale]) || '',
        getPublisher: null,
        getFormats: [],
        getSummary: [
          { text: dataset.version || '', title: 'Version' },
          { text: dataset.license || '', title: 'Lizenz' },
        ],
      }

      const getPropertyTable: PropertyTableEntryNode[] = [
        definePropertyNode({ id: 'license', label: 'Lizenz', data: dataset.license || '' }),
        definePropertyNode({ data: dataset.requirements || [], label: 'Anforderungen', id: 'requirements' }),
        definePropertyNode({ id: 'documentation', label: 'Dokumentation', data: dataset.documentation || '' }),
      ]

      return {
        ...enhanced,
        getPropertyTable,
      }
    },
  )
}

export function useHardwareSearch() {
  return defineHubSearch(
    {
      baseUrl: '/__mock-search',
      index: 'hardwares',
      indexDetails: 'hardware',
      schema: schemaHardware,
      facets: [
      ],
    },
    (dataset, localeInstance) => {
      const { currentLocale: locale } = localeInstance

      const enhanced: EnhancedSearchResult = {
        getId: dataset.id || '',
        getTitle:
        typeof dataset.name === 'string'
          ? dataset.name
          : getTranslationFor(dataset.name, [locale]) || dataset.id || '',
        getDescription: typeof dataset.description === 'string'
          ? dataset.description
          : getTranslationFor(dataset.description, [locale]) || '',
        getPublisher: null,
        getFormats: [],
        getSummary: [
          { text: dataset.type || '', title: 'Typ' },
          { text: dataset.host_platform?.name || '', title: 'Plattform' },
          { text: dataset.manufacturer?.name || '', title: 'Hersteller' },
        ],
      }

      const getPropertyTable: PropertyTableEntryNode[] = [
        definePropertyNode({ data: dataset.type || '', label: 'Typ', id: 'type' }),
        definePropertyNode({ data: dataset.documentation || '', label: 'Dokumentation', id: 'documentation' }),
        definePropertyNode({ data: dataset.feature_of_interest || '', label: 'Fokus', id: 'feature_of_interest' }),
        definePropertyNode({ data: dataset.host_platform?.name || '', label: 'Plattform', id: 'host_platform' }),
        definePropertyNode({ data: dataset.manufacturer?.name, label: 'Hersteller', id: 'manufacturer' }),
      ]

      return {
        ...enhanced,
        getPropertyTable,
      }
    },
  )
}

export function useProjectSearch() {
  return defineHubSearch(
    {
      baseUrl: '/__mock-search',
      index: 'projects',
      indexDetails: 'project',
      schema: schemaProject,
      facets: [
      ],
    },
    (dataset, localeInstance) => {
      const { currentLocale: locale } = localeInstance

      const enhanced: EnhancedSearchResult = {
        getId: dataset.id || '',
        getTitle:
        typeof dataset.name === 'string'
          ? dataset.name
          : getTranslationFor(dataset.name, [locale]) || dataset.id || '',
        getDescription: typeof dataset.description === 'string'
          ? dataset.description
          : getTranslationFor(dataset.description, [locale]) || '',
        getPublisher: null,
        getFormats: [],
        getSummary: [
          { text: dataset.status || '', title: 'Status' },
          { text: dataset.budget?.amount || '', title: 'Budget' },
        ],
      }

      const getPropertyTable: PropertyTableEntryNode[] = [
        definePropertyNode({ data: dataset.status || '', label: 'Status', id: 'status' }),
        definePropertyNode({ data: dataset.budget?.amount || '', label: 'Budget', id: 'budget' }),
        definePropertyNode({ data: dataset.linked_organisation?.id || '', label: 'Organisation', id: 'linked_organisation' }),
        definePropertyNode({ data: dataset.linked_process_steps || [], label: 'Prozessschritte', id: 'linked_process_steps' }),
        definePropertyNode({ data: dataset.documentation || '', label: 'Dokumentation', id: 'documentation' }),
        definePropertyNode({ data: dataset.required_skills || [], label: 'Anforderungen', id: 'required_skills' }),
      ]

      return {
        ...enhanced,
        getPropertyTable,
      }
    },
  )
}

export function useProcessStepsSearch() {
  return defineHubSearch(
    {
      baseUrl: '/__mock-search',
      index: 'processSteps',
      indexDetails: 'processStep',
      schema: schemaProcessSteps,
      facets: [
      ],
    },
    (dataset, localeInstance) => {
      const { currentLocale: locale } = localeInstance

      const enhanced: EnhancedSearchResult = {
        getId: dataset.id || '',
        getTitle:
        typeof dataset.name === 'string'
          ? dataset.name
          : getTranslationFor(dataset.name, [locale]) || dataset.id || '',
        getDescription: typeof dataset.description === 'string'
          ? dataset.description
          : getTranslationFor(dataset.description, [locale]) || '',
        getPublisher: null,
        getFormats: [],
        getSummary: [
          { title: 'Vorheriger Schritt', text: dataset.previous_step?.id || '' },
          { title: 'Kontakt', text: dataset?.actors_responsibility?.map(actor => actor?.organization).join(', ') || '' },
        ],
      }

      const getPropertyTable: PropertyTableEntryNode[] = [
        definePropertyNode({ id: 'activityNode', label: 'Aktivät', data: dataset.activity || '' }),
        definePropertyNode({ id: 'previousStep', label: 'Vorheriger Schritt', data: dataset.previous_step?.id || '' }),
        definePropertyNode({ id: 'documentation', label: 'Dokumentation', data: dataset.documentation || '' }),
      ]

      return {
        ...enhanced,
        getPropertyTable,
      }
    },
  )
}
