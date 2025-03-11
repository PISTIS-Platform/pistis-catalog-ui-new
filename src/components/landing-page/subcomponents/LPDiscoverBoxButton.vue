<script setup>
import appConfig from '@config/appConfig'

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
  suffix: {
    type: String,
    required: false,
  },
  route: {
    type: String,
    required: true,
  },
})

const primaryColor = appConfig.customer.primaryColor

function togglePressed() {
  console.log('button pressed!')
}
</script>

<template>
  <router-link :to="route">
    <div
      class="button-container"
      @click="togglePressed"
    >
      <div class="button-content">
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
  font-style: normal;
  line-height: 20px;
  color: v-bind(primaryColor);
  gap: 8px;
  flex-shrink: 0;
  border-radius: 4px;
  text-align: center;
  font-size: 22px;
  font-weight: 400;
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
