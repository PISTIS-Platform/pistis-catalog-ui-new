import type { PropertyTableEntryNode } from '@piveau/sdk-vue'

export interface DistributionViewModel {
  id?: string
  title?: string
  description: string
  format?: string
  properties?: PropertyTableEntryNode[]
  accessUrls?: string[]
  downloadUrls?: string[]
}

export interface DistributionDataInfoBoxProps extends DistributionViewModel {}
export interface DistributionDataInfoBoxListProps {
  distributions: DistributionViewModel[]
}
