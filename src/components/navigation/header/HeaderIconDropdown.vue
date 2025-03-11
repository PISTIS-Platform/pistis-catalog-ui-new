<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Icon',
  },
})

const iconUrl = computed(() =>
  new URL(`/src/assets/icons/${props.icon}`, import.meta.url).href)

const isDropdownOpen = ref(false)
function toggle() {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <div
    class="header-icon-container"
    :class="{ active: isDropdownOpen }"
    @click="toggle()"
  >
    <img
      class="header-icon"
      :src="iconUrl"
      :alt="alt"
    >
    <div
      class="header-icon-dropdown"
      :class="{ open: isDropdownOpen }"
    >
      <slot name="dropdown-content" />
    </div>
  </div>
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

.header-icon-dropdown {
    position: absolute;
    min-width: 323px;
    top: 100%;
    z-index: 1100;
    display: none;
    flex-direction: column;
    padding: 32px 24px;
    gap: 16px;
    background-color:  #fff;
    border: 1px solid #DDE1E6;
    border-radius: 8px;
    visibility: collapse;
}

.open {
  display: flex;
  visibility: visible;
}
</style>
