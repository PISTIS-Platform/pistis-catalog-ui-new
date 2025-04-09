<template>
  <div class="flex flex-col gap-2">
    <template v-if="!isLoading && !isFetching">
      <DataInfoCard
          v-for="dataset in datasets"
          :key="dataset.id"
          :to="{ name: 'dataset-details', params: { datasetId: dataset.id } }"
          :title="dataset.title"
          :description="dataset.description"
          :file-formats="dataset.formats"
          :properties="dataset.summary"
      />
    </template>
    <template v-else>
      <div v-for="i in itemsCount.value" :key="i" class="size-full flex flex-col gap-6 text-content animate-pulse bg-slate-200">
        <div class="flex flex-wrap gap-2 h-64" />
      </div>
    </template>
  </div>
  <div class="grid w-full place-content-center">
    <Paginator
        v-model:first="searchParams.queryParams.page.value"
        class="rounded"
        :rows="1"
        :total-records="getSearchResultsPagesCount"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import Paginator from 'primevue/paginator';
import DataInfoCard from '@/components/base/data-info-box/DataInfoCard.vue';
import { useSearchParams } from '@/composables/useSearchParams';

const searchParams = useSearchParams();
const itemsCount = computed(() => (searchParams?.queryParams?.limit ?? 10));

const props = defineProps<{
  datasets: [],
  getSearchResultsPagesCount: Function,
  isLoading: boolean,
  isFetching: boolean,
  showOnlyPublic: boolean
}>();
</script>
