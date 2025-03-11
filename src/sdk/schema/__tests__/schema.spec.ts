/* eslint-disable perfectionist/sort-imports */
import { describe, expect, it } from 'vitest'

import {
  schemaHardware,
  schemaOrganisation,
  schemaProcessSteps,
  schemaProject,
  schemaSoftware,
} from '../index'
// ProcessSteps
import JsonCollection from './1-Collection.json' with { type: 'json' }
import JsonProcessing from './2-Processing.json' with { type: 'json' }
import JsonSimulation from './3-Simulation.json' with { type: 'json' }
import JsonVisualization from './4-Visualization.json' with { type: 'json' }

import JsonOrganization from './Organization.json' with { type: 'json' }
import JsonProject from './Project.json' with { type: 'json' }
import JsonSoftware from './Software.json' with { type: 'json' }

// Hardware
import JsonGateway from './Gateway.json' with { type: 'json' }
import JsonTrafficSensor from './TrafficSensor.json' with { type: 'json' }

describe('schema', () => {
  const processStepsSpec = [
    { name: 'JsonCollection', dataset: JsonCollection },
    { name: 'JsonProcessing', dataset: JsonProcessing },
    { name: 'JsonSimulation', dataset: JsonSimulation },
    { name: 'JsonVisualization', dataset: JsonVisualization },
  ]

  const hardwareSpec = [
    { name: 'JsonTrafficSensor', dataset: JsonTrafficSensor },
    { name: 'JsonGateway', dataset: JsonGateway },
  ]

  const organizationSpec = [
    { name: 'JsonOrganization', dataset: JsonOrganization },
  ]

  const projectSpec = [
    { name: 'JsonProject', dataset: JsonProject },
  ]

  const softwareSpec = [
    { name: 'JsonSoftware', dataset: JsonSoftware },
  ]

  it.each(processStepsSpec)('processSteps: should successfully parse $name', ({ dataset }) => {
    const parsed = schemaProcessSteps.parse(dataset)
    expect(parsed).toBeDefined()
  })

  it.each(hardwareSpec)('hardware: should successfully parse $name', ({ dataset }) => {
    const parsed = schemaHardware.parse(dataset)
    expect(parsed).toBeDefined()
  })

  it.each(organizationSpec)('organization: should successfully parse $name', ({ dataset }) => {
    const parsed = schemaOrganisation.parse(dataset)
    expect(parsed).toBeDefined()
  })

  it.each(projectSpec)('project: should successfully parse $name', ({ dataset }) => {
    const parsed = schemaProject.parse(dataset)
    expect(parsed).toBeDefined()
  })

  it.each(softwareSpec)('software: should successfully parse $name', ({ dataset }) => {
    const parsed = schemaSoftware.parse(dataset)
    expect(parsed).toBeDefined()
  })
})
