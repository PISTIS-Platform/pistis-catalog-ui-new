<script setup lang="ts">
import { ref } from 'vue';
import { getMatchingDatasets } from './MatchmakingService'

const props = defineProps<{ datasetId: string }>();
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
    <div
        v-for="dataset in matchingDatasets"
        :key="dataset.dataset_id"
        class="border rounded-lg border-pistis-500 p-3 mb-4"
      >
        <p><strong> {{ dataset.title }} </strong></p>
        <p>{{ dataset.description }}</p>
        <p>{{ dataset.price }}€</p>
        <p>{{ dataset.offer_type }}</p>
      </div>
</template>