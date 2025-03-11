/* eslint-disable perfectionist/sort-imports */
import type { SearchResult } from '@piveau/sdk-core'
import { asArray } from '@piveau/sdk-vue'
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

// ProcessSteps
import JsonCollection from '../../sdk/schema/__tests__/1-Collection.json' with { type: 'json' }
import JsonProcessing from '../../sdk/schema/__tests__/2-Processing.json' with { type: 'json' }
import JsonSimulation from '../../sdk/schema/__tests__/3-Simulation.json' with { type: 'json' }
import JsonVisualization from '../../sdk/schema/__tests__/4-Visualization.json' with { type: 'json' }

import JsonOrganization from '../../sdk/schema/__tests__/Organization.json' with { type: 'json' }
import JsonProject from '../../sdk/schema/__tests__/Project.json' with { type: 'json' }
import JsonSoftware from '../../sdk/schema/__tests__/Software.json' with { type: 'json' }

// Hardware
import JsonGateway from '../../sdk/schema/__tests__/Gateway.json' with { type: 'json' }
import JsonTrafficSensor from '../../sdk/schema/__tests__/TrafficSensor.json' with { type: 'json' }

const processSteps = [
  JsonCollection,
  JsonProcessing,
  JsonSimulation,
  JsonVisualization,
]

const hardware = [
  JsonGateway,
  JsonTrafficSensor,
]

const organization = [
  JsonOrganization,
]

const project = [
  JsonProject,
]

const software = [
  JsonSoftware,
]

function defineSearchResult<T>({ index, data }: { index: string, data: T | T[] }): SearchResult<T> {
  const _data = asArray(data)

  return {
    result: {
      count: _data.length,
      facets: [],
      index,
      results: _data,
    },
  }
}

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  // GET /__mock-search/search/?filter={processSteps|hardware|organization|project|software}
  http.get('/__mock-search/search', async ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('filter')

    if (filter === 'processSteps') {
      return HttpResponse.json(defineSearchResult({ index: 'processSteps', data: processSteps }))
    }

    if (filter === 'hardwares') {
      return HttpResponse.json(defineSearchResult({ index: 'hardware', data: hardware }))
    }

    if (filter === 'organizations') {
      return HttpResponse.json(defineSearchResult({ index: 'organization', data: organization }))
    }

    if (filter === 'projects') {
      return HttpResponse.json(defineSearchResult({ index: 'project', data: project }))
    }

    if (filter === 'softwares') {
      return HttpResponse.json(defineSearchResult({ index: 'software', data: software }))
    }

    return HttpResponse.json({ msg: 'default' })
  }),

  // GET /_mock-search/:type/:id
  http.get('/__mock-search/:type/:id', async ({ params }) => {
    const type = params.type
    const id = typeof params.id === 'string' ? params.id : ''
    if (type === 'processStep') {
      const data = Object.values(processSteps).find(processStep => processStep.id === id)
      return HttpResponse.json({ result: data })
    }

    if (type === 'hardware') {
      const data = Object.values(hardware).find(hardware => hardware.id === id)
      return HttpResponse.json({ result: data })
    }

    if (type === 'organization') {
      const data = Object.values(organization).find(organization => organization.id === id)
      return HttpResponse.json({ result: data })
    }

    if (type === 'project') {
      const data = Object.values(project).find(project => project.id === id)
      return HttpResponse.json({ result: data })
    }

    if (type === 'software') {
      const data = Object.values(software).find(software => software.id === id)
      return HttpResponse.json({ result: data })
    }

    return HttpResponse.json({ msg: 'default' })
  }),
]
