/**
 * Schema for Resource type 'Software'
 */

import * as z from 'zod'
import { schemaBaseWithDescription } from './shared'

export const schemaHardware = schemaBaseWithDescription.extend({
  type: z.string().nullable().optional(),

  manufacturer: z.object({
    name: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
  }).nullable().optional(),

  model: z.string().nullable().optional(),

  feature_of_interest: z.string().nullable().optional(),

  host_platform: z.object({
    name: z.string().nullable().optional(),
  }).nullable().optional(),

  hosts: z.array(z.object({ id: z.string() })).nullable().optional(),

  location: z.object({
    latitude: z.string().nullable().optional(),
    longitude: z.string().nullable().optional(),
    region: z.string().nullable().optional(),
  }).nullable().optional(),

  requirements: z.array(z.string()).nullable().optional(),

  documentation: z.array(z.string()).nullable().optional(),
})

/**
 * HARDWARE: Devices that capture physical or environmental data. ssn and sosa ontologies can be used.
 */
export type Hardware = z.infer<typeof schemaHardware>
