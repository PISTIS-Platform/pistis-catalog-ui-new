<script setup lang="ts">
import Footer from './components/header-footer/Footer.vue'
import Header from './components/header-footer/Header.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <div class="flex-1 overflow-y-auto">
      <RouterView />
    </div>
    <Footer class="mt-auto" />
  </div>
</template>
