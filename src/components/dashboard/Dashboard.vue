<script setup lang="ts">
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { ref } from 'vue'
import KCard from '../base/card/KCard.vue'
import KCta from '../base/cta/KCta.vue'

const products = ref([
  { dataset: 'Datenset 1', status: 'active', format: 'csv' },
  { dataset: 'Datenset 2', status: 'active', format: 'csv' },
  { dataset: 'Datenset 3', status: 'active', format: 'csv' },
  { dataset: 'Datenset 4', status: 'active', format: 'csv' },
  { dataset: 'Datenset 5', status: 'active', format: 'csv' },
  { dataset: 'Datenset 6', status: 'active', format: 'csv' },
  { dataset: 'Datenset 7', status: 'active', format: 'csv' },
])

const events = ref([
  {
    status: 'Ordered',
    superTitle: 'Mainzer Stadtwerke',
    date: '15/10/2020 10:30',
    icon: 'icon-[ph--address-book]',
    color: '#9C27B0',
  },
  {
    status: 'Processing',
    superTitle: 'Mainzer Stadtwerke',
    date: '15/10/2020 14:00',
    icon: 'icon-[ph--download]',
    color: '#673AB7',
  },
  {
    status: 'Shipped',
    superTitle: 'Mainzer Stadtwerke',
    date: '15/10/2020 16:15',
    icon: 'icon-[ph--at]',
    color: '#FF9800',
  },
  {
    status: 'Delivered',
    superTitle: 'Mainzer Stadtwerke',
    date: '16/10/2020 10:00',
    icon: 'icon-[ph--address-book]',
    color: '#607D8B',
  },
])
</script>

<template>
  <div class="relative size-full">
    <div class="relative h-[360px] w-full bg-slate-100">
      <div class="absolute left-0 top-0 size-full bg-gradient-to-r from-black/75 to-transparent" />
      <div class="grid size-full place-content-center">
        img
      </div>
    </div>
    <section class="relative -top-10 px-6">
      <div class="flex flex-col gap-6 lg:flex-row">
        <div class="flex-1">
          <KCta
            title="Daten Analysieren"
            text="Hier kannst du alle Datensets festhalten"
          />
        </div>
        <div class="flex-1">
          <KCta
            title="Daten Analysieren"
            text="Hier kannst du alle Datensets festhalten"
          />
        </div>
        <div class="flex-1">
          <KCta
            title="Daten Analysieren"
            text="Hier kannst du alle Datensets festhalten"
          />
        </div>
      </div>
    </section>
    <section>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <KCard class="lg:col-span-3">
          <template #title>
            Offene Anfragen zu deinen Datensets
          </template>
          <template #content>
            <DataTable
              size="small"
              :value="products"
              table-style="min-width: 50rem"
            >
              <Column
                field="dataset"
                header="Datenset"
              />
              <Column
                field="status"
                header="Status"
              />
              <Column
                field="format"
                header="Format"
              />
              <!-- <Column field="quantity" header="Quantity" /> -->
            </DataTable>
          </template>
        </KCard>
        <KCard class="lg:col-span-2">
          <template #title>
            Deine Datensets im Überblick
          </template>
          <template #content>
            <DataTable
              size="small"
              :value="products"
              table-style="min-width: 50rem"
            >
              <Column
                field="dataset"
                header="Datenset"
              />
              <Column
                field="status"
                header="Status"
              />
              <Column
                field="format"
                header="Format"
              />
              <!-- <Column field="quantity" header="Quantity" /> -->
            </DataTable>
            <!-- <div class="grid h-[180px] place-content-center rounded-xl bg-surface-200">
              Anfragen
            </div> -->
          </template>
        </KCard>
        <KCard class="lg:col-span-1">
          <template #title>
            Neues aus deiner Plattform
          </template>
          <template #content>
            <div class="grid h-[180px] place-content-center rounded-xl bg-surface-200">
              Neues
            </div>
          </template>
        </KCard>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
