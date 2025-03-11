<script setup>
import { computed } from 'vue'

const props = defineProps({
  route: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Icon',
  },
})

const iconUrl = computed(() => {
  return new URL(`/src/assets/icons/${props.icon}`, import.meta.url).href
})
</script>

<template>
  <RouterLink
    v-slot="{ href, navigate, isActive, isExactActive }"
    :to="route"
  >
    <a
      class="header-icon-container"
      :class="{ active: isActive && isExactActive }"
      :href="href"
      @click="navigate"
    >
      <img
        class="header-icon"
        :src="iconUrl"
        :alt="alt"
      >
    </a>
  </RouterLink>
</template>

<style scoped>
.header-icon-container {
  width: 40px;
  height: 40px;
  border: 1px solid #d4dde3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  background-color: #f4f6f9;
}

.header-icon {
  width: 24px;
  height: 24px;
}

.header-icon-container:hover {
  background-color: #f4f6f9;
}
</style>
