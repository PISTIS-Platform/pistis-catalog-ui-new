<script setup lang="ts">
import KButton from '@/components/base/button/KButton.vue'

const props = defineProps<{
  openSidebar: Function
}>()
</script>

<template>
  <section>
    <div class="flex items-center gap-2 p-2">
      <KButton
        @click="openSidebar()"
      >
        <i class="icon-[ph--text-align-left]" />
      </KButton>
      <span>Search filter</span>
    </div>
  </section>
</template>
