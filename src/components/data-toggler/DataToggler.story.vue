<script setup>
import { ref } from 'vue'
import DataToggler from './DataToggler.vue'

const list = ref([1, 2, 3, 4, 5, 6, 7])
const someText = ref('Hello World')
const expanded = ref(true)
</script>

<template>
  <Story
    title="Components/Data Toggler"
  >
    <div class="flex flex-col gap-4">
      <DataToggler v-slot="{ truncated }" v-model:expanded="expanded" :data="list" :limit="4">
        <div class="flex flex-col gap-2">
          <span v-for="item in truncated" :key="item">{{ item }}</span>
        </div>
      </DataToggler>
      <DataToggler v-slot="{ truncated }" v-model:expanded="expanded" :data="someText" :limit="4">
        <div class="flex flex-col gap-2">
          <span>{{ truncated }}</span>
        </div>
      </DataToggler>
    </div>
  </Story>
</template>
