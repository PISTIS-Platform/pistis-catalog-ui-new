<template>
  <search-items
      :items="catalogues"
      :getSearchResultsPagesCount="getSearchResultsPagesCount"
      :isLoading="isLoading"
      :isFetching="isFetching"
      :showOnlyPublic="showOnlyPublic"
  >
    <template v-slot="{item}">
      <catalogues-list-item
        :item="item"
      />
    </template>
  </search-items>
</template>

<script setup lang="ts">
import SearchItems from "@/views/search/SearchItems.vue";
import CataloguesListItem from "./CataloguesListItem.vue";
const props = defineProps<{
  catalogues: [],
  getSearchResultsPagesCount: number,
  isLoading: boolean,
  isFetching: boolean,
  showOnlyPublic: boolean
}>();
</script>
