<script setup>
import appConfig from '@config/appConfig'

const props = defineProps({
  route: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  capitalizeText: {
    type: Boolean,
    required: false,
    default: false,
  },
  prefix: {
    type: String,
    required: false,
  },
  suffix: {
    type: String,
    required: false,
  },
})

const primaryColor = appConfig.customer.primaryColor
</script>

<template>
  <router-link :to="route">
    <div class="button-container">
      <div class="button-content">
        <img
          v-if="prefix"
          :src="prefix"
          alt=""
        >
        <span :class="{ 'capitalize-text': capitalizeText }">{{ buttonText }}</span>
        <img
          v-if="suffix"
          :src="suffix"
          alt=""
        >
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
  height: 40px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: v-bind(primaryColor);
  gap: 8px;
  flex-shrink: 0;
  border-radius: 4px;
}

.button-container:hover {
  cursor: pointer;
}

.button-content {
  display: flex;
  gap: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
