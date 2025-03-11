<script setup>
import appConfig from '@config/appConfig'

const props = defineProps({
  featureBoxTitle: {
    type: String,
    required: true,
  },
  featureBoxIcon: {
    type: String,
    required: true,
  },
  featureBoxText: {
    type: String,
    required: true,
  },
})

const primaryColor = appConfig.customer.primaryColor
</script>

<template>
  <div class="feature-box">
    <div class="feature-box-content">
      <img
        :src="featureBoxIcon"
        alt="Test"
      >
      <span class="feature-box-title">{{ featureBoxTitle }}</span>
      <span class="feature-box-text">{{ featureBoxText }}</span>
    </div>
  </div>
</template>

<style scoped>
.feature-box {
  border-radius: 8px;
  border: 1px solid #d9e1e7;
  min-width: 280px;
  flex: 1 1 calc(50% - 64px);
}

.feature-box-content {
  padding: 24px 34px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 24px;
}

.feature-box-title {
  color: v-bind(primaryColor);
  font-family: Inter, serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
}

.feature-box-text {
  color: #33404a;
  font-family: Inter, serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 44px;
}
</style>
