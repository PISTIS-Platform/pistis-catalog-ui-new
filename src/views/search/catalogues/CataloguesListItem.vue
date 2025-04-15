<template>
  <router-link to="datasets">
    <h3>HELLOO {{ item.id }}</h3>
  </router-link>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
const props = defineProps<{
  item: {id: string}
}>();
</script>
