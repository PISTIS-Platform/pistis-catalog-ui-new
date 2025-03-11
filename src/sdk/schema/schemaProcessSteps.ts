/**
 * Schema for Resource type 'Software'
 */

import * as z from 'zod'
import { schemaBaseWithDescription } from './shared'

export const schemaProcessSteps = schemaBaseWithDescription.extend({
  activity: z.string().nullable().optional(),

  previous_step: z.object({
    id: z.string().nullable().optional(),
  }).nullable().optional(),

  inputs: z.object({
    linked_hardware: z.array(z.object({ id: z.string() })).nullable().optional(),
    linked_software: z.array(z.object({ id: z.string() })).nullable().optional(),
    linked_data: z.array(z.object({ id: z.string() })).nullable().optional(),
  }).nullable().optional(),

  methods_used: z.array(z.object({
    method: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  })).nullable().optional(),

  actors_responsibility: z.array(z.object({
    role: z.string().nullable().optional(),
    organization: z.string().nullable().optional(),
    contact: z.string().nullable().optional(),
  })).nullable().optional(),

  documentation: z.string().nullable().optional(),
})

/**
 * PROCESS STEPS: Steps required to carry out the project, such as Data processing, Data visualisation, and Data storage
 */
export type ProcessSteps = z.infer<typeof schemaProcessSteps>
