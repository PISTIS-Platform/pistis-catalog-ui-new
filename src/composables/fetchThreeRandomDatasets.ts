import type { AxiosInstance } from 'axios'
import axios from 'axios'

const allLicenses = [
  'http://dcat-ap.de/def/licenses/cc-by/4.0',
  'http://dcat-ap.de/def/licenses/cc-zero',
  'http://dcat-ap.de/def/licenses/dl-by-de/2.0',
  'http://dcat-ap.de/def/licenses/cc-by',
  'http://dcat-ap.de/def/licenses/cc-by-sa/4.0',
  'http://dcat-ap.de/def/licenses/cc-by-sa',
  'http://dcat-ap.de/def/licenses/odcpddl',
  'http://dcat-ap.de/def/licenses/cc-by-de/3.0',
  'http://dcat-ap.de/def/licenses/odbl',
  'http://dcat-ap.de/def/licenses/other-open',
  'https://creativecommons.org/licenses/by/4.0/',
  'http://dcat-ap.de/def/licenses/odby',
  'http://opendatacommons.org/licenses/odbl/',
  'http://dcat-ap.de/def/licenses/dl-by-de/1.0',
  'https://creativecommons.org/licenses/by-nd/4.0',
  'https://w3id.org/mdp/schema/license%23NO_LICENSE',
] as const

const allFormats = [
  'CSV',
  'XML',
  'XLS',
  'XLSX',
  'WMS_SRVC',
  'ZIP',
  'GEOJSON',
  'Web Page',
  'ArcGIS GeoServices REST API',
  'KML',
  'OGC WFS',
  'JSON',
  'Download',
  'N3',
  'SHP',
  'WFS_SRVC',
  'ATOM',
  'HTML',
  'Information',
  'PDF',
  'TXT',
  'ODS',
  'shape',
  'GPKG',
  'JSON_LD',
  'OCTET',
  'GZIP',
  'Kontakt',
  'ODP',
  'GPX',
  'RSS',
  '7Z',
  'SVG',
  'GEOTIFF',
  'HDF',
  'JPEG',
  'MPEG4',
  'NAS',
  'PNG',
  'REST',
  'TAR',
  'Testdaten',
] as const

export interface InterestingDataset {
  id: string
  title: string
  description: string
  catalog: string
  formats: string[]
}

export function formatDataset(ds: any): InterestingDataset {
  return {
    id: ds.id || '',
    title: ds.title?.de || '',
    description: ds.description?.de || '',
    catalog:
			typeof ds.publisher === 'string'
			  ? ds.publisher
			  : ds.publisher?.name?.de || ds.publisher?.name || '',
    formats: [
      ...new Set(
        ds.distributions
          ?.map((dist: any) => dist?.format?.label || null)
          .filter(Boolean),
      ),
    ] as string[],
  }
}

// Step 1: Fetch all catalog IDs
async function fetchCatalogs(api: AxiosInstance): Promise<string[]> {
  try {
    const response = await api.get('/catalogues')
    return response.data
  }
  catch (error) {
    console.error('Error fetching catalogs', error)
    return []
  }
}

// Step 2: Fetch random dataset from a catalog
async function fetchRandomDatasetFromCatalog(
  catalogId: string,
  api: AxiosInstance,
): Promise<InterestingDataset | null> {
  const limit = 100
  try {
    // First fetch to get total count
    const initialResponse = await api.get(
      `/search?filter=dataset&facets={"catalog": ["${catalogId}"],"license":${JSON.stringify(allLicenses)},"format":${JSON.stringify(allFormats)}}&page=0&limit=${limit}&includes=id,title.de,description.de,publisher,distributions.format.label`,
    )

    console.log(`Fetched datasets count from catalog ${catalogId}`)

    const totalDatasets = initialResponse.data.result.count
    if (totalDatasets === 0)
      return null

    // Select random dataset
    const randomDatasetIndex = Math.floor(Math.random() * totalDatasets)
    const randomPage = Math.floor(randomDatasetIndex / limit)
    const datasetIndexOnPage = randomDatasetIndex % limit

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let datasets
    if (randomPage === 0) {
      datasets = initialResponse.data.result.results
    }
    else {
      const pageResponse = await api.get(
        `/search?filter=dataset&facets={"catalog": ["${catalogId}"],"license":${JSON.stringify(allLicenses)},"format":${JSON.stringify(allFormats)}}&page=${randomPage}&limit=${limit}&includes=id,title.de,description.de,publisher,distributions.format.label`,
      )
      console.log(
        `Fetched datasets from catalog ${catalogId} at random page ${randomPage}`,
      )
      datasets = pageResponse.data.result.results
    }

    if (datasets.length <= datasetIndexOnPage)
      return null

    return formatDataset(datasets[datasetIndexOnPage])
  }
  catch (error) {
    console.error(`Error fetching datasets from catalog ${catalogId}`, error)
    return null
  }
}

// Step 3: Select three random datasets
async function selectRandomDatasets(
  baseUrl: string,
): Promise<InterestingDataset[]> {
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  try {
    // Get all catalogs
    const catalogIds = await fetchCatalogs(api)

    // Shuffle catalog IDs
    const shuffledCatalogIds = [...catalogIds].sort(() => 0.5 - Math.random())

    const results: InterestingDataset[] = []

    // Process catalogs until we have 3 valid datasets
    for (const catalogId of shuffledCatalogIds) {
      if (results.length >= 3)
        break

      const dataset = await fetchRandomDatasetFromCatalog(catalogId, api)
      if (dataset) {
        results.push(dataset)
      }
    }

    console.log('Results', results)

    return results
  }
  catch (error) {
    console.error('Error selecting random datasets', error)
    return []
  }
}

// Main export function
export async function fetchThreeRandomDatsets(
  baseUrl: string,
): Promise<InterestingDataset[]> {
  return selectRandomDatasets(baseUrl)
}
