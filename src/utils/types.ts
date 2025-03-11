export interface SelectOption {
  label: string
  value: string
}

export type SelectOptionList = SelectOption[]

export interface Facet {
  id: string
  label: string
  value?: string
  count?: number
}

export type FacetList<T extends string = string> = {
  id: T
  label: string
  items: Facet[]
}[]

export interface PropertyTableEntryBase {
  id: string
}

// export interface PropertyTableEntry {
//   label: string
//   id: string
//   data: PropertyTableRow
// }

export interface PropertyTableCellHref {
  label: string
  href: string
}

export interface PropertyTableCellContact {
  type: 'adress'
  name: string
  address: string
  telephone: string
  email: string
  organization: string
}

export type PropertyTableCell = string | number

export interface PropertyTableEntryNode extends PropertyTableEntryBase {
  type: 'node'
  label: string
  data: PropertyTableEntry[]
}

export interface PropertyTableEntryValue extends PropertyTableEntryBase {
  type: 'value'
  data: PropertyTableCell[] | PropertyTableCell
}

export interface PropertyTableEntryHref extends PropertyTableEntryBase {
  type: 'href'
  data: PropertyTableCellHref | PropertyTableCellHref[]
}

export type PropertyTableEntry = PropertyTableEntryNode | PropertyTableEntryValue | PropertyTableEntryHref

export type PropertyTableRow = PropertyTableCell | PropertyTableCell[] | PropertyTableEntry[]

export type PropertyTableProps = PropertyTableEntry[]

export type LooseAutocomplete<T extends string> = T | (string & NonNullable<unknown>)

export type DatasetType = 'kritis' | 'opendata' | 'municipal'

export interface DatasetTypeOption {
  label: string
  icon: string
  color: string
}

export const datasetTypeMap = {
  kritis: {
    label: 'KRITIS Daten',
    color: 'bg-primary-600',
    icon: 'icon-[ph--warning]',
  },
  opendata: {
    label: 'Open Data',
    color: 'bg-success-600',
    icon: 'icon-[ph--warning]',
  },
  municipal: {
    label: 'Kommunale Daten',
    color: 'bg-info-600',
    icon: 'icon-[ph--warning]',
  },
} satisfies Record<DatasetType, DatasetTypeOption>
