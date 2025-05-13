<script setup>
import KButton from '@/components/base/button/KButton.vue'
import Sidebar from 'primevue/sidebar'
import { ref } from 'vue'
import NavigationBar from './NavigationBar.vue'

const visible = ref(false)
</script>

<template>
  <header class=" border-gray-200 bg-header-bg text-header-bg-text">
    <div class="flex justify-between gap-3 lg:container lg:px-8 py-5 items-center px-8 mx-auto">
      <RouterLink class="block" to="/">
        <div class="brand">
          <img
            src="../../assets/images/piveau-logo.svg"
            alt="open.bydata"
            class="block h-8"
          >
          <!-- <span class="ml-5">Piveau</span> -->
        </div>
      </RouterLink>
      <div class="flex flex-row items-center justify-between">
        <div class="hidden md:block">
          <NavigationBar />
        </div>
        <div class="authentication-buttons">
          <div class="card justify-content-center flex">
            <Sidebar
              v-model:visible="visible"
              header="Sidebar"
              position="full"
            >
              <template #header>
                <div class="flex h-12 items-center justify-center px-2">
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
      <div class="flex items-center gap-2">
        <a target="_blank" href="https://doc.piveau.eu/general/introduction/" class="mr-4 flex items-center font-light">Docs <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-box-arrow-up-right ml-2" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
          <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
        </svg></a>
        <a target="_blank" href="https://gitlab.com/piveau/" class="flex items-center font-light"><img src="../../assets/images/icons8-gitlab-48.png" alt="Gitlab" class="mr-1 size-4">GitLab </a>
      </div>
    </div>
  </header>
</template>

<style>
.brand {
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  font-size: xx-large;
  font-weight: bold;
}
</style>
