/**
 * Schema for Resource type 'Hardware'
 */

import * as z from 'zod'
import { schemaBaseWithDescription } from './shared'

export const schemaOrganisation = schemaBaseWithDescription.extend({
  /**
   * The type of organization (e.g., Local Government, Municipality, City Council). org:classification
   *
   */
  type: z.string().nullable().optional(),

  location: z.object({
    region: z.string(),
  }).nullable().optional(),

  website: z.string().nullable().optional(),

  linked_projects: z.array(z.object({ id: z.string() })).nullable().optional(),
  linked_software: z.array(z.object({ id: z.string() })).nullable().optional(),
  linked_hardware: z.array(z.object({ id: z.string() })).nullable().optional(),
})

export type Organisation = z.infer<typeof schemaOrganisation>
