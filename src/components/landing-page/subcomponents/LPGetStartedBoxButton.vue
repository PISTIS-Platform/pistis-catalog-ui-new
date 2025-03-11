<script setup>
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
})

function togglePressed() {
  console.log('button pressed!')
}
</script>

<template>
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
  justify-content: center;
  align-items: center;
  font-family: 'Inter', serif;
  font-style: normal;
  line-height: 20px;
  color: #0e8cc0;
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
