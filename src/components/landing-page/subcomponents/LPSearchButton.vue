<script setup>
import appConfig from '@config/appConfig'
import { computed } from 'vue'

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  capitalizeText: {
    type: Boolean,
    required: false,
    default: false,
  },
  searchPrompt: {
    type: String,
    required: false,
  },
})

const primaryColor = appConfig.customer.primaryColor

const dataCatalogRoute = computed(() => {
  return props.searchPrompt ? `/data-catalog?q=${props.searchPrompt}` : '/data-catalog'
})
</script>

<template>
  <router-link :to="dataCatalogRoute">
    <div
      class="button-container"
    >
      <div class="button-content">
        <span :class="{ 'capitalize-text': capitalizeText }">{{ buttonText }}</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.capitalize-text {
  text-transform: uppercase;
}

.button-container {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  width: max-content;
  display: inline-flex;
  height: 50px;
  padding: 0 32px;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', serif;
  color: white;
  gap: 8px;
  flex-shrink: 0;
  border: 1px solid v-bind(primaryColor);
  border-radius: 4px;
  background: v-bind(primaryColor);
}

.button-container:active {
  background: rgba(22, 65, 148, 0.5);
}

.button-content {
  display: flex;
  gap: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
