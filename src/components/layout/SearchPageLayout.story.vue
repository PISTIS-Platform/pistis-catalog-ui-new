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
        <div class="flex flex-col gap-4 p-4 max-h-full overflow-scroll">
          <div class="h-12 flex-none grid place-content-center rounded-md bg-surface-300">
            A0
          </div>
          <div class="h-14 flex-none grid place-content-center rounded-md bg-surface-300">
            A1
          </div>
          <div class="h-48 flex-none grid place-content-center rounded-md bg-surface-300">
            A2
          </div>
          <div class="h-4 flex-none grid place-content-center rounded-md bg-surface-300">
            A3
          </div>
          <div class="h-72 flex-none grid place-content-center rounded-md bg-surface-300">
            A4
          </div>
          <div class="h-48 flex-none grid place-content-center rounded-md bg-surface-300">
            A5
          </div>
          <div class="h-72 flex-none grid place-content-center rounded-md bg-surface-300">
            A6
          </div>
          <div class="h-64 flex-none grid place-content-center rounded-md bg-surface-300">
            A7
          </div>
        </div>
      </template>
      <template #top>
        <div class="h-96 grid place-content-center mb-4 bg-primary-400">
          B
        </div>
      </template>
      <div class="flex flex-col gap-2 mx-4">
        <div class="flex flex-row gap-2">
          <div class="h-12 w-96 grid place-content-center rounded-md bg-primary-200">
            B
          </div>
          <div class="h-12 w-12 rounded-full grid place-content-center bg-primary-200">
            B
          </div>
        </div>
        <div class="mb-2 flex flex-row flex-none justify-between">
          <div class="h-12 w-48 grid place-content-center rounded-md bg-primary-200">
            B
          </div>
          <div class="h-12 w-48 grid place-content-center rounded-md bg-primary-200">
            B
          </div>
        </div>
        <div class="h-48 grid place-content-center rounded-md bg-primary-200">
          B
        </div>
        <div class="h-48 grid place-content-center rounded-md bg-primary-200">
          B
        </div>
        <div class="h-48 grid place-content-center rounded-md bg-primary-200">
          B
        </div>
        <div class="h-48 grid place-content-center rounded-md bg-primary-200">
          B
        </div>
        <div class="h-48 grid place-content-center rounded-md bg-primary-200">
          B
        </div>
      </div>
    </SearchPageLayout>
  </Story>
</template>

<style scoped></style>
