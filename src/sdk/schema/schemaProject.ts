/**
 * Schema for Resource type 'Hardware'
 */

import * as z from 'zod'
import { schemaBaseWithDescription } from './shared'

export const schemaProject = schemaBaseWithDescription.extend({
  /**
   * The financial resources allocated or required for the project.
   *
   * @example
   * {
   *   "amount": "5000000",
   *   "currency": "EUR"
   * }
   */
  budget: z.object({
    amount: z.string(),
    currency: z.string(),
  }).nullable().optional(),

  /**
   * The skill sets or expertise needed (e.g., data science, IoT, urban planning).
   *
   * @example
   * ["IoT", "Data Science", "Urban Planning"]
   */
  required_skills: z.array(z.string()).nullable().optional(),

  /**
   * Start/end dates or milestones for the project.
   *
   * @example
   * {
   *   "start_date": "2025-01-01",
   *   "end_date": "2027-12-31"
   * }
   */
  timeline: z.object({
    start_date: z.string(),
    end_date: z.string(),
  }),

  /**
   * Indicates whether the project is in planning, active, or completed.
   */
  status: z.string().nullable().optional(),

  /**
   * The steps or phases required to execute the project (e.g., data processing, visualization).
   *
   * @example
   * ["PS-2025-001", "PS-2025-002", "PS-2025-003", "PS-2025-004"]
   */
  linked_process_steps: z.array(z.string()).nullable().optional(),

  /**
   * The entity (local government) carrying out or sponsoring the project.
   *
   * @example
   * {
   *   "id": "ORG-HAAR-001"
   * }
   */
  linked_organisation: z.object({ id: z.string() }).nullable().optional(),

  /**
   * Links to project proposals, status reports, or final summaries.
   *
   * @example
   * ["https://example.org/documents/SC-2025-001-proposal.pdf", "https://example.org/documents/SC-2025-001-final-report.pdf"]
   */
  documentation: z.array(z.string()).nullable().optional(),
})

/**
 * PROJECT: Smart city project carried out by an organisation. Including description of project and resources required.
 */
export type Project = z.infer<typeof schemaProject>
