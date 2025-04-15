<template>
  <router-link to="datasets">
    <div class="group relative mx-auto box-border w-full rounded-b-none border-b-[3px]
      border-neutral-20 border-b-transparent bg-white p-12 hover:border-b-primary-pressed">

      <h3>HELLOO {{ item.id }}</h3>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
const props = defineProps<{
  item: {id: string}
}>();
</script>
