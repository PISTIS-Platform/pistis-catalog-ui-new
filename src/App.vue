<script setup lang="ts">
import LPFooter from './components/landing-page/LPFooter.vue'
import LPHeader from './components/landing-page/LPHeader.vue'

// import { useAuthToDpiBridge } from './projects/kdw/composables/useAuthToDpiBridge';
// useAuthToDpiBridge();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LPHeader />
    <div class="flex-1 overflow-y-auto">
      <RouterView />
    </div>
    <LPFooter class="mt-auto" />
  </div>
</template>

<style scoped></style>
