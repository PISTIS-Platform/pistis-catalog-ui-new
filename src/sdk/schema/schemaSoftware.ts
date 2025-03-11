/**
 * Schema for Resource type 'Software'
 */

import * as z from 'zod'
import { schemaBaseWithDescription } from './shared'

export const schemaSoftware = schemaBaseWithDescription.extend({
  category: z.string().nullable().optional(),

  /**
   * The usage and distribution terms (e.g., Open-Source, Commercial).
   */
  license: z.string().nullable().optional(),

  /**
   * An identifier for a specific release (e.g., 1.0, 2.3).
   */
  version: z.string().nullable().optional(),

  /**
   * Conditions for using/running the software (e.g., system requirements, user skill level).
   */
  requirements: z.array(z.string()).nullable().optional(),

  /**
   * Links to manuals, API docs, or guides.
   */
  documentation: z.array(z.string()).nullable().optional(),
})

export type Software = z.infer<typeof schemaSoftware>
