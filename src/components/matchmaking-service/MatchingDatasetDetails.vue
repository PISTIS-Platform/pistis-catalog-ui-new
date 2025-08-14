<script setup lang="ts">
import { ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { getMatchingDatasets } from './MatchmakingService'

const props = defineProps<{ 
    datasetId: string
}>();
const matchingDatasets = ref<any[]>([]);

const loadData = async () => {
  try {
    matchingDatasets.value = await getMatchingDatasets(props.datasetId);
  } catch (error) {
        console.error('Loading mock data failed:', error);
    }
};

loadData();
</script>

<template>
    <RouterLink
        v-for="dataset in matchingDatasets"
        :key="dataset.dataset_id"
        class="block border rounded-lg border-pistis-500 p-3 mb-4 hover:bg-pistis-100"
        :to="{ name: 'dataset-details', params: { datasetId: dataset.dataset_id } }"
      >
        <p><strong> {{ dataset.title }} </strong></p>
        <p>{{ dataset.description }}</p>
        <p class="text-pistis-500">{{ dataset.price }}€</p>
        <p>{{ dataset.offer_type }}</p>
    </RouterLink>
</template>