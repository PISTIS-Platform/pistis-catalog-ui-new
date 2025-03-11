<script setup>
import LPDiscoverBox from '@/components/landing-page/subcomponents/LPDiscoverBox.vue'
import appConfig from '@config/appConfig'

const primaryColor = appConfig.customer.primaryColor
</script>

<template>
  <div class="main-container">
    <div class="discover-content">
      <h1 class="discover-title">
        {{ $t('landing-page.discover-data.title') }}
      </h1>
      <div class="boxes">
        <LPDiscoverBox
          :button-text="$t('landing-page.discover-data.box-one-button-text')"
          :box-text="$t('landing-page.discover-data.box-one-text')"
          route="/data-catalog"
        />
        <LPDiscoverBox
          :button-text="$t('landing-page.discover-data.box-two-button-text')"
          :box-text="$t('landing-page.discover-data.box-two-text')"
          route="/app/home"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: auto;
  padding: 50px 10px;
  background: #f4f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.discover-content {
  width: 100%;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
}

.discover-title {
  overflow: hidden;
  color: v-bind(primaryColor);
  text-align: center;
  text-overflow: ellipsis;
  font-family: Inter, serif;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.boxes {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 24px;
}

@media screen and (min-width: 820px) {
  .boxes {
    padding-left: 92px;
    padding-right: 92px;
    flex-wrap: nowrap;
  }

}
</style>
