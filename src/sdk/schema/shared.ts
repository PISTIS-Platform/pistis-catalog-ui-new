/**
 * Schema for Resource type 'Hardware'
 */

import { schemaTranslatedContent } from '@piveau/sdk-core'
import * as z from 'zod'

/**
 * Base schema for all resources
 */
export const schemaBase = z.object({
  id: z.string(),

  /**
   * A short label for the device or hardware component. org:identifier, foaf:name
   *
   * @remark String or multilingual?
   *
   */
  name: z.string().or(schemaTranslatedContent).nullable().optional(),
})

export const schemaBaseWithDescription = schemaBase.extend({
  /**
   * A brief summary of what the device does, including relevant specifications. dct:description, rdfs:comment
   *
   * @remark String or multilingual?
   */
  description: z.string().or(schemaTranslatedContent).nullable().optional(),
})
