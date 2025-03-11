<script setup lang="ts">
import type { PropertyTableEntryNode } from '@piveau/sdk-vue'
import { definePropertyNode } from '@piveau/sdk-vue'
import { ref } from 'vue'
import DistributionCard from './DistributionCard.vue'

const table = definePropertyNode({
  id: 'foo',
  label: 'Foo',
  data: [
    { type: 'node', id: 'langs', label: 'Sprachen', data: [{ id: '', type: 'href', data: { href: 'http://publications.europa.eu/resource/authority/language/DEU', label: 'Deutsch' } }] },
    { type: 'node', id: 'publisher', label: 'Datenbereitsteller', data: 'Hochschulbibliothekszentrum des Landes Nordrhein-Westfalen (hbz)' },
    { type: 'node', id: 'publisher', label: 'Kontaktmöglichkeiten', data: ['Hochschulbibliothekszentrum des Landes Nordrhein-Westfalen (hbz)', 'mailto:info-hbz@hbz-nrw.de'] },
    { type: 'node', id: 'publisher', label: 'Aktualisiert', data: '09.07.2024' },
    { type: 'node', id: 'publisher', label: 'Erstellt', data: '09.07.2024' },
    { type: 'node', id: 'publisher', label: 'Identifikatoren', data: [{ id: '', type: 'href', data: { href: 'https://open.bydata.de/datasets/dbs-Spezbib-2022-Ausleihe?locale=de', label: 'dbs-Spezbib-2022-Ausleihe' } }] },
  ],
}) satisfies PropertyTableEntryNode

const distribution = ref({
  title: 'Flächennutzung/ Verkehrsfläche Stadt Ingolstadt',
  description: 'Some description',
  format: 'CSV',
  downloadUrls: ['https://example.com'],
  modified: '2022-01-01',
  data: table,
})
</script>

<template>
  <Story title="Components/DistributionCard">
    <DistributionCard
      :title="distribution.title || ''"
      :description="distribution.description || ''"
      :format="distribution.format || 'Unknown'"
      :download-url="distribution.downloadUrls?.[0]!"
      :last-updated="distribution.modified"
      :data="distribution.data"
    />
  </Story>
</template>

<style scoped></style>
