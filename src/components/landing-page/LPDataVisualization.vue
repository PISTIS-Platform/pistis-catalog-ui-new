<script setup lang="ts">
import { useStatsQuery } from '@/composables/landingPageQueries'
import { useRuntimeEnv } from '@/projects/data-provider-interface/composables/useRuntimeEnv'
import DataVizualisation from './subcomponents/DataVizualisation.vue'

const env = useRuntimeEnv()
const baseUrl = env.api.baseUrl

const sparqlUrl = '/api/sparql/'

const DEFAULT_STATS = {
  numOfDatasets: 1100,
  numOfDistributions: 2000,
  numOfPublishers: 100,
} as const

const DEFAULT_VISUALIZATION_STATS = [
  { value: 475, short: 'ENVI', long: 'Umwelt' },
  { value: 228, short: 'GOVE', long: 'Regierung und öffentlicher Sektor' },
  { value: 172, short: 'REGI', long: 'Regionen und Städte' },
  { value: 561, short: 'TECH', long: 'Wissenschaft und Technologie' },
  { value: 119, short: 'ENER', long: 'Energie' },
  { value: 121, short: 'TRAN', long: 'Verkehr' },
  {
    value: 68,
    short: 'AGRI',
    long: 'Landwirtschaft, Fischerei, Forstwirtschaft und Nahrungsmittel',
  },
  { value: 19, short: 'ECON', long: 'Wirtschaft und Finanzen' },
  { value: 3, short: 'HEAL', long: 'Gesundheit' },
  { value: 4, short: 'EDUC', long: 'Bildung, Kultur und Sport' },
  { value: 3, short: 'SOCI', long: 'Bevölkerung und Gesellschaft' },
  { value: 0, short: 'INTR', long: 'Internationale Themen' },
  { value: 0, short: 'JUST', long: 'Justiz, Rechtssystem und öffentliche Sicherheit' },
] as const

const data = useStatsQuery({
  hubSearchUrl: `${baseUrl}search?q=&filter=dataset&limit=0`,
  sparqlUrl: `${sparqlUrl}?default-graph-uri=&query=prefix+dcat%3A++%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fdcat%23%3E+%0D%0Aselect+count%28%3Fd%29+where+%7B%0D%0A++%3Fd+a+dcat%3ADistribution+.%0D%0A%7D+&format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on`,
  defaultStats: DEFAULT_STATS,
  defaultVisualizationStats: DEFAULT_VISUALIZATION_STATS,
})
</script>

<template>
  <div class="container mx-auto">
    <div class="w-full grid place-items-center">
      <div class="w-full px-8">
        <div class="grid grid-cols-1 gap-12 w-full sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
          <div
            v-for="(stat, key) of data.statsModel.value"
            :key="key"
            class="flex flex-col gap-2 px-6 lg:first:justify-self-start lg:even:justify-self-center lg:last:justify-self-end"
          >
            <span class="text-primary-20 font-bold text-7xl">{{ stat.count }}</span>
            <span class="text-primary-20 font-bold text-base">{{ stat.description }}</span>
          </div>
        </div>
      </div>
    </div>

    <DataVizualisation
      class="w-full mb-40"
      :data="data.vizData.value"
    />
  </div>
</template>
