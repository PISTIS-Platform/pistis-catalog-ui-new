<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { logEvent } from 'histoire/client'
import KSplitButton from './KSplitButton.vue'

const items = [
  {
    label: 'Delete',
  },
  {
    separator: true,
  },
  {
    label: 'Create',
  },
  {
    label: 'Edit',
  },
] satisfies MenuItem[]
</script>

<template>
  <Story title="Base Components/SplitButton">
    <div class="justify-content-center flex gap-3">
      <KSplitButton
        label="Save"
        :model="items"
        @click="logEvent('click', $event)"
      />
      <KSplitButton
        label="Save"
        severity="secondary"
        :model="items"
        @click="logEvent('click', $event)"
      />
      <KSplitButton
        label="Save"
        severity="success"
        :model="items"
        @click="logEvent('click', $event)"
      />
      <KSplitButton
        label="Save"
        severity="info"
        :model="items"
        @click="logEvent('click', $event)"
      />
      <KSplitButton
        label="Save"
        severity="warning"
        :model="items"
        @click="logEvent('click', $event)"
      />
      <KSplitButton
        label="Save"
        severity="help"
        :model="items"
        @click="logEvent('click', $event)"
      />
      <KSplitButton
        label="Save"
        severity="danger"
        :model="items"
        @click="logEvent('click', $event)"
      />
      <KSplitButton
        label="Save"
        severity="contrast"
        :model="items"
        @click="logEvent('click', $event)"
      />
    </div>
  </Story>
</template>

<style scoped></style>
