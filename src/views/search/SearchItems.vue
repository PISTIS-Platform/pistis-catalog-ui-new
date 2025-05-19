<script setup lang="ts">
import DataInfoCard from '@/components/base/data-info-box/DataInfoCard.vue'
import Paginator from 'primevue/paginator'
import { computed, defineProps } from 'vue'
import { useSearchParams } from './useSearchParams'

const props = defineProps<{
  items: []
  getSearchResultsPagesCount: number
  isLoading: boolean
  isFetching: boolean
  showOnlyPublic: boolean
}>()
const searchParams = useSearchParams()
const itemsCount = computed(() => (searchParams?.queryParams?.limit ?? 10))
</script>

<template>
  <div class="flex flex-col gap-2">
    <template v-if="!isLoading && !isFetching">
      <slot v-for="item in items" :key="item.id" :item="item">
        <DataInfoCard
          :to="{ name: 'dataset-details', params: { datasetId: item.id } }"
          :title="item.title"
          :description="item.description"
          :file-formats="item.formats"
          :properties="item.summary"
        />
      </slot>
    </template>
    <template v-else>
      <div v-for="i in itemsCount.value" :key="i" class="flex size-full animate-pulse flex-col gap-6 bg-slate-200 text-content rounded-3xl">
        <div class="flex h-64 flex-wrap gap-2" />
      </div>
    </template>
  </div>
  <div class="grid w-full place-content-center">
    <Paginator
        v-model:first="searchParams.queryParams.page.value"
        class="rounded-sm cursor-pointer"
        :rows="1"
        :total-records="getSearchResultsPagesCount"
    />
  </div>
</template>
