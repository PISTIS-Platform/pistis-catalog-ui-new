<script lang="ts" setup>
import type { Facet } from '../../../utils/types'
import { ref } from 'vue'
import KFacetGroup from './KFacetGroup.vue'

const facets = ref([
  {
    id: 'sci',
    label: 'Wissenschaft und Technologie',
    count: 1280,
  },
  {
    id: 'art',
    label: 'Kunst und Kultur',
    count: 700,
  },
  {
    id: 'pol',
    label: 'Politik und Gesellschaft',
    count: 23,
  },
  {
    id: 'spo',
    label: 'Sport und Freizeit',
    count: 12,
  },
  {
    id: 'wir',
    label: 'Wirtschaft und Recht',
    count: 3,
  },
] satisfies Facet[])
const items = ref([])
</script>

<template>
  <Story title="Components/Facets/Facet Group">
    <div class="flex flex-col gap-4 bg-white max-w-[20rem]">
      <KFacetGroup
        v-model="items"
        title="Kategorien"
        :facets="facets"
      />
      <div>{{ items }}</div>
    </div>
  </Story>
</template>
