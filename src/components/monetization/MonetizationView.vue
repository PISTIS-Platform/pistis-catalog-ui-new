<template>
  <Typography variant="by-heading-4"> {{ $t('monetization.header') }} </Typography>
  <div v-if="isObject(data)">
    <p><strong>{{ $t('monetization.transferable') }}:</strong> {{ data.transferable || "-"}}</p>

    <p><strong>{{ $t('monetization.type') }}:</strong> {{ data.type || "-"}}</p>

    <p><strong>{{ $t('monetization.exclusive') }}:</strong> {{ data.is_exclusive ? 'Yes' : 'No' || "-"}}</p>

    <p><strong>{{ $t('monetization.termination-date') }}:</strong> {{ data.termDate || "-" }}</p>

    <p><strong>{{ $t('monetization.price') }}:</strong> {{ data.price || "-"}} €</p>

    <div v-if="data.downloads && data.downloads.length">
      <strong>{{ $t('monetization.downloads') }}:</strong>
      <ul>
        <li v-for="(dl, index) in data.downloads" :key="index">
          {{ dl.frequency || "-"}}: {{ dl.downloads || "-"}}
        </li>
      </ul>
    </div>

    <div v-if="data.personal_data_terms && data.personal_data_terms.length">
      <strong>{{ $t('monetization.personal-data-terms') }}:</strong>
      <ul>
        <li v-for="(term, index) in data.personal_data_terms" :key="index">
          <span>{{ term.personal_data_terms || "-"}}</span>
        </li>
      </ul>
    </div>

    <div v-if="data.license">
      <strong>{{ $t('monetization.license') }}:</strong>
      <p class="p-0!">
        <a :href="data.license.la_url" target="_blank" rel="noopener noreferrer">{{ data.license.label || "-"}}</a><br />
        {{ data.license.description || "-"}}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const t = useI18n

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
