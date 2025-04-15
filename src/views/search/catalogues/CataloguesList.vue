<template>
  <search-items
      :items="catalogues"
      :getSearchResultsPagesCount="getSearchResultsPagesCount"
      :isLoading="isLoading"
      :isFetching="isFetching"
      :showOnlyPublic="showOnlyPublic"
  >
    <template v-slot="{item}">
      <h3>HELLOO {{ item.id }}</h3>
    </template>
  </search-items>
</template>

<script setup lang="ts">
import SearchItems from "@/views/search/SearchItems.vue";
const props = defineProps<{
  catalogues: [],
  getSearchResultsPagesCount: number,
  isLoading: boolean,
  isFetching: boolean,
  showOnlyPublic: boolean
}>();
</script>
