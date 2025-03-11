<script setup>
import LPOpenDataFeatureBox from '@/components/landing-page/subcomponents/LPOpenDataFeatureBox.vue'
import appConfig from '@config/appConfig'

const primaryColor = appConfig.customer.primaryColor
</script>

<template>
  <div class="main-container">
    <div class="open-data-content">
      <h1 class="open-data-title">
        {{ $t('landing-page.open-data.title') }}
      </h1>
      <div class="open-data-info">
        <div class="info-column">
          <div class="open-data-chips">
            <div class="open-data-chip">
              <span class="open-data-chip-text">{{ $t('landing-page.open-data.chip-one') }}</span>
            </div>
            <div class="open-data-chip">
              <span class="open-data-chip-text">{{ $t('landing-page.open-data.chip-two') }}</span>
            </div>
            <div class="open-data-chip">
              <span class="open-data-chip-text">{{ $t('landing-page.open-data.chip-three') }}</span>
            </div>
          </div>
          <p class="open-data-description">
            {{ $t('landing-page.open-data.description') }}
          </p>
        </div>
        <img
          class="datencatalog-image"
          src="../../../src/assets/images/data-catalog.svg"
          alt=""
        >
      </div>
      <div class="open-data-boxes">
        <LPOpenDataFeatureBox
          feature-box-icon="src/assets/icons/OpenDataLayer.svg"
          :feature-box-title="$t('landing-page.open-data.box-one-title')"
          :feature-box-text="$t('landing-page.open-data.box-one-text')"
        />
        <LPOpenDataFeatureBox
          feature-box-icon="src/assets/icons/LockFolder.svg"
          :feature-box-title="$t('landing-page.open-data.box-two-title')"
          :feature-box-text="$t('landing-page.open-data.box-two-text')"
        />
        <LPOpenDataFeatureBox
          feature-box-icon="src/assets/icons/CheckFile.svg"
          :feature-box-title="$t('landing-page.open-data.box-three-title')"
          :feature-box-text="$t('landing-page.open-data.box-three-text')"
        />
        <LPOpenDataFeatureBox
          feature-box-icon="src/assets/icons/UserGroup.svg"
          :feature-box-title="$t('landing-page.open-data.box-four-title')"
          :feature-box-text="$t('landing-page.open-data.box-four-text')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.open-data-content {
  width: 100%;
  max-width: 1380px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.info-column {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 16px;
  padding: 0 14px;
}

.open-data-chips {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 12px;
}

.open-data-chip {
  border-radius: 45px;
  border: 2px solid #d9e1e7;
  background: #fff;
}

.open-data-chip-text {
  padding: 16px;
  color: v-bind(primaryColor);
  font-family: Inter, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
}

.open-data-title {
  width: 100%;
  max-width: 900px !important;
  padding-top: 64px;
  color: v-bind(primaryColor);
  font-size: 48px;
  font-family: Inter, serif;
  font-weight: 600;
  word-wrap: break-word;
  text-align: center;
  padding-bottom: 64px;
}

.open-data-info {
  width: 100%;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  gap: 70px;
  padding-bottom: 64px;
}

.open-data-description {
  overflow: hidden;
  color: #33404a;
  text-overflow: ellipsis;
  font-family: Inter, serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 44px;
}

.datencatalog-image {
  position: relative;
  object-fit: contain;
  width: 95%;
  height: auto;
  border: 10px solid #d9e1e7;
  border-radius: 15px;
}

.open-data-boxes {
  padding-bottom: 64px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  padding-inline: 32px;
}

@media screen and (min-width: 768px) {
  .info-column {
    padding: 0 92px;
  }
}

@media screen and (min-width: 1024px) {
  .open-data-info {
    flex-direction: row;
  }
  .info-column {
    padding: 0 92px;
  }
  .datencatalog-image {
    width: 838px;
  }
}

@media screen and (min-width: 1381px) {
  .info-column {
    padding: 0;
  }
}
</style>
