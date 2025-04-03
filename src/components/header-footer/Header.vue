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
        <img
            src="/logo.svg"
            alt="open.bydata"
            class="block h-12"
        >
      </RouterLink>
      <div class="flex flex-row items-center gap-8 justify-between">
        <div class="hidden md:block">
          <NavigationBar />
        </div>
        <div class="authentication-buttons">
          <!-- <a
            v-if="registrationURL"
            class="header-icon-container active"
            :href="registrationURL"
            target="_blank">
            {{ $t('landing-page.header.registration') }}
          </a> -->
          <!-- <COSLanguageSwitch /> -->
          <div class="card flex justify-content-center">
            <Sidebar
                v-model:visible="visible"
                header="Sidebar"
                position="full"
            >
              <template #header>
                <div class="flex items-center justify-center px-2 h-12">
                  <img
                      src="/logo.svg"
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
          <!-- <LPLoginButton
            suffix="src/assets/icons/ArrowRight.svg"
            :button-text="$t('landing-page.header.login')"
            route="/app" /> -->
        </div>
      </div>
    </div>
  </header>
</template>
