<template>
  <div v-if="isObject(data)">
    <p><strong>Transferable:</strong> {{ data.transferable }}</p>

    <p><strong>Type:</strong> {{ data.type }}</p>

    <p><strong>Exclusive:</strong> {{ data.is_exclusive ? 'Yes' : 'No' }}</p>

    <p><strong>Termination Date:</strong> {{ data.termDate }}</p>

    <p><strong>Price:</strong> {{ data.price }} €</p>

    <div v-if="data.downloads && data.downloads.length">
      <strong>Downloads:</strong>
      <ul>
        <li v-for="(dl, index) in data.downloads" :key="index">
          {{ dl.frequency }}: {{ dl.downloads }}
        </li>
      </ul>
    </div>

    <div v-if="data.personal_data_terms && data.personal_data_terms.length">
      <strong>Personal Data Terms:</strong>
      <ul>
        <li v-for="(term, index) in data.personal_data_terms" :key="index">
          <span v-if="term.contains_personal_data">{{ term.personal_data_terms }}</span>
          <span v-else>None</span>
        </li>
      </ul>
    </div>

    <div v-if="data.license">
      <strong>License:</strong>
      <p class="p-0!">
        <a :href="data.license.la_url" target="_blank" rel="noopener noreferrer">{{ data.license.label }}</a><br />
        {{ data.license.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const isObject = (value) => {
  return value && typeof value === 'object' && !Array.isArray(value);
};
</script>

<style scoped>
  p, div {
    padding-top: 1rem;
  }
</style>