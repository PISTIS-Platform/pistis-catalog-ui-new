<template>
  <search-items>
<!--    <data-info-card-->
<!--        v-for="item in items"-->
<!--        :key="item.id"-->
<!--        :to="{ name: 'dataset-details', params: { datasetId: item.id } }"-->
<!--        :title="item.title"-->
<!--        :description="item.description"-->
<!--        :file-formats="item.formats"-->
<!--        :properties="item.summary"-->
<!--    />-->
  </search-items>
</template>

<script setup lang="ts">

import SearchItems from "@/views/search/SearchItems.vue";
import DataInfoCard from "@/components/base/data-info-box/DataInfoCard.vue";
</script>
