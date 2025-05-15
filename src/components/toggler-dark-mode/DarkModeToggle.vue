<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Dynamic Sun/Moon Icon -->
    <svg 
      class="h-4 w-5 text-surface-text"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        v-if="!isDark"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
      <path
        v-else
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>

    <!-- Toggle Switch -->
    <label
      class="relative block h-4 w-7 rounded-full bg-gray transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-primary dark:bg-surface-800 dark:has-checked:bg-primary-hover cursor-pointer"
    >
      <input 
        type="checkbox" 
        class="peer sr-only" 
        :checked="isDark"
        @change="toggleDarkMode"
      >
      <span
        class="absolute inset-y-0 start-0 m-0.5 size-3 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-3 dark:bg-surface-900"
      ></span>
    </label>
  </div>
</template>

<style scoped>
.has-checked\:bg-primary:has(:checked) {
  background-color: var(--primary);
}

.dark .dark\:has-checked\:bg-primary-hover:has(:checked) {
  background-color: var(--primary-hover);
}
</style>