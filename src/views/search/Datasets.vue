<template>
  <h1>Datasets!</h1>
  <div class="flex flex-col gap-2">
    <DataInfoCard
        v-for="dataset in datasets"
        :key="dataset.id"
        :to="{ name: 'dataset-details', params: { datasetId: dataset.id } }"
        :title="dataset.title"
        :description="dataset.description"
        :file-formats="dataset.formats"
        :properties="dataset.summary"
    />
  </div>
</template>

<script setup>
  import DataInfoCard from '../../components/base/data-info-box/DataInfoCard.vue'
  const datasets = [{
    id: 1,
    title: "Mock Dataset",
    description: "Mock Dataset description !!!",
    formats: [],
    summary: "Mock Dataset",
  }];
</script>

