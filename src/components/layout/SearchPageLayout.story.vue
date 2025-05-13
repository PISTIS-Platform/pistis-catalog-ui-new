<script setup lang="ts">
import SearchPageLayout from './SearchPageLayout.vue'
</script>

<template>
  <Story
    title="Layouts/Search Page"
    :meta="{ wrapper: false }"
  >
    <SearchPageLayout>
      <template #sidebar>
        <div class="flex max-h-full flex-col gap-4 overflow-scroll p-4">
          <div class="grid h-12 flex-none place-content-center rounded-md bg-surface-300">
            A0
          </div>
          <div class="grid h-14 flex-none place-content-center rounded-md bg-surface-300">
            A1
          </div>
          <div class="grid h-48 flex-none place-content-center rounded-md bg-surface-300">
            A2
          </div>
          <div class="grid h-4 flex-none place-content-center rounded-md bg-surface-300">
            A3
          </div>
          <div class="grid h-72 flex-none place-content-center rounded-md bg-surface-300">
            A4
          </div>
          <div class="grid h-48 flex-none place-content-center rounded-md bg-surface-300">
            A5
          </div>
          <div class="grid h-72 flex-none place-content-center rounded-md bg-surface-300">
            A6
          </div>
          <div class="grid h-64 flex-none place-content-center rounded-md bg-surface-300">
            A7
          </div>
        </div>
      </template>
      <template #top>
        <div class="bg-primary-400 mb-4 grid h-96 place-content-center">
          B
        </div>
      </template>
      <div class="mx-4 flex flex-col gap-2">
        <div class="flex flex-row gap-2">
          <div class="bg-primary-200 grid h-12 w-96 place-content-center rounded-md">
            B
          </div>
          <div class="bg-primary-200 grid size-12 place-content-center rounded-full">
            B
          </div>
        </div>
        <div class="mb-2 flex flex-none flex-row justify-between">
          <div class="bg-primary-200 grid h-12 w-48 place-content-center rounded-md">
            B
          </div>
          <div class="bg-primary-200 grid h-12 w-48 place-content-center rounded-md">
            B
          </div>
        </div>
        <div class="bg-primary-200 grid h-48 place-content-center rounded-md">
          B
        </div>
        <div class="bg-primary-200 grid h-48 place-content-center rounded-md">
          B
        </div>
        <div class="bg-primary-200 grid h-48 place-content-center rounded-md">
          B
        </div>
        <div class="bg-primary-200 grid h-48 place-content-center rounded-md">
          B
        </div>
        <div class="bg-primary-200 grid h-48 place-content-center rounded-md">
          B
        </div>
      </div>
    </SearchPageLayout>
  </Story>
</template>

<style scoped></style>
