<script setup lang="ts">
import SuggestedDatasetCard from '@/components/suggested-dataset-card/SuggestedDatasetCard.vue'

import { useRuntimeEnv } from '@/projects/data-provider-interface/composables/useRuntimeEnv'
import { useAsyncState } from '@vueuse/core'
import { fetchThreeRandomDatsets } from '../../composables/fetchThreeRandomDatasets'

const { api } = useRuntimeEnv()
const { baseUrl } = api

const { state: interestingDatasets } = useAsyncState(() => fetchThreeRandomDatsets(baseUrl), [], {
  resetOnExecute: false,
})
</script>

<template>
  <section class="container mx-auto py-40 space-y-8">
    <h2 class="text-white font-display text-center text-5xl font-semibold mb-16">
      Digitale Zwillinge zum Loslegen
    </h2>
    <div class="dark flex w-full gap-6 flex-col max-w-content-max mx-auto items-start self-stretch lg:flex-row lg:content-start lg:flex-nowrap">
      <SuggestedDatasetCard
        v-for="dataset in interestingDatasets"
        :id="dataset.id"
        :key="dataset.id"
        class="w-full"
        :title="dataset.title"
        :description="dataset.description"
        :formats="dataset.formats"
        :catalog="dataset.catalog"
        dark
      />
    </div>
  </section>
</template>
