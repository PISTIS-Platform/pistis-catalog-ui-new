<script setup>
import KButton from '@/components/base/button/KButton.vue'
import Sidebar from 'primevue/sidebar'
import { ref } from 'vue'
import NavigationBar from './NavigationBar.vue'

const visible = ref(false)
</script>

<template>
  <header class="border-b border-gray-200">
    <div class="flex justify-between gap-3 lg:container lg:px-8 py-5 items-center px-8 mx-auto">
      <RouterLink class="block" to="/">
        <div class="brand">
          <img
              src="/logo.png"
              alt="open.bydata"
              class="block h-12"
          >
          <span class="ml-5">Piveau</span>
        </div>
      </RouterLink>
      <div class="flex flex-row items-center gap-8 justify-between">
        <div class="hidden md:block">
          <NavigationBar />
        </div>
        <div class="authentication-buttons">
          <div class="card flex justify-content-center">
            <Sidebar
                v-model:visible="visible"
                header="Sidebar"
                position="full"
            >
              <template #header>
                <div class="flex items-center justify-center px-2 h-12">
                  <img
                      src="/logo.png"
                      alt="open.bydata"
                      class="h-12"
                  >
                </div>
              </template>
              <div class="mx-auto px-6 py-8">
                <NavigationBar direction="vertical" />
              </div>
            </Sidebar>
            <KButton
                severity="contrast"
                class="block md:hidden"
                icon="icon-[ph--list]"
                @click="visible = true"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.brand {
  display: flex;
  flex-direction: row;
  font-size: xx-large;
  font-weight: bold;
}
</style>
