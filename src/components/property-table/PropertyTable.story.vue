<script setup lang="ts">
import type { PropertyTableEntryNode } from '@piveau/sdk-vue'
import { definePropertyNode } from '@piveau/sdk-vue'
import { ref } from 'vue'
import { PropertyTable as PropertyTableRow } from './PropertyTableRow'

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

const data = ref(table)
</script>

<template>
  <Story title="Components/Property Table">
    <div class="p-4 bg-white">
      <PropertyTableRow :node="data" />
    </div>
  </Story>
</template>

<style scoped></style>
