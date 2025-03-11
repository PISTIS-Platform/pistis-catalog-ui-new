<script setup>
import LPGetStartedBoxButton from '@/components/landing-page/subcomponents/LPGetStartedBoxButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  buttonTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="get-started-box">
    <div class="get-started-graphics">
      <img
        :src="image"
        alt=""
      >
    </div>
    <div class="get-started-box-content">
      <span class="get-started-box-content-text">{{ title }}</span>
      <LPGetStartedBoxButton
        :button-text="buttonTitle"
        suffix="src/assets/icons/ArrowRightAlt.svg"
      />
    </div>
  </div>
</template>

<style scoped>
.get-started-box {
  width: auto;
  max-width: 400px;
}
.get-started-graphics {
  height: 250px;
  width: 100%;
  background: #def6fd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.get-started-box-content {
  padding: 24px;
  background: white;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

.get-started-box-content-text {
  color: #33404a;
  text-overflow: ellipsis;
  font-family: Inter, serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 44px;
  word-break: break-word;
}

@media screen and (min-width: 425px) {
  .get-started-box-content-text {
    word-break: normal;
  }
}
</style>
