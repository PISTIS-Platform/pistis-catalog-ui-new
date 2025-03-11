<script setup>
import LPDiscoverBoxButton from '@/components/landing-page/subcomponents/LPDiscoverBoxButton.vue'

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  boxText: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="box-container">
    <p class="box-text">
      {{ boxText }}
    </p>
    <LPDiscoverBoxButton
      :route="route"
      suffix="src/assets/icons/ArrowRight.svg"
      :button-text="buttonText"
    />
  </div>
</template>

<style scoped>
.box-text {
  color: #33404a;
  text-align: center;
  font-family: Inter, serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 44px;
}
.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
  height: auto;
  padding: 24px 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #d9e1e7;
  min-height: 218px;
}

@media screen and (min-width: 350px) {
  .box-text {
    padding-left: 32px;
    padding-right: 32px;
  }
}
</style>
