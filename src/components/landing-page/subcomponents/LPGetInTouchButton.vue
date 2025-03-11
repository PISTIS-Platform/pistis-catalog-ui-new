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
  prefix: {
    type: String,
    required: false,
  },
})

const primaryColor = appConfig.customer.primaryColor

function togglePressed() {
  console.log('button pressed!')
}
</script>

<template>
  <div
    class="button-container"
    @click="togglePressed"
  >
    <a href="mailto:product@civora.org">
      <div class="button-content">
        <img
          v-if="prefix"
          :src="prefix"
          alt=""
        >
        <span :class="{ 'capitalize-text': capitalizeText }">{{ buttonText }}</span>
      </div>
    </a>
  </div>
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
  height: 56px;
  padding: 0 20px;
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
