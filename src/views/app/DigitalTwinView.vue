<script setup>
import appConfig from '@config/appConfig'
import { onMounted, onUnmounted, ref } from 'vue'

const primaryColor = appConfig.customer.primaryColor

const isMobile = ref(window.innerWidth <= 480)
onMounted(() => {
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 480
    console.log(isMobile.value)
  }

  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
const digitalTwinUrl = appConfig.digitalTwinUrl
const backgroundImageUrl = `src/assets/images/${appConfig.components.headerImageFileName}`
</script>

<template>
  <main>
    <div
      class="digital-twin"
      :style="{
        'background-image': `url(${backgroundImageUrl})`,
      }"
    >
      <div class="header-container">
        <div class="header-content">
          <h2 class="header-title">
            {{ $t('views.app.digital-twin-view.digital-twin-title') }}
          </h2>
          <i18n-t
            keypath="views.app.digital-twin-view.digital-twin-subtitle"
            tag="h4"
            class="header-subtitle"
          >
            <template #break>
              <br>
            </template>
          </i18n-t>
          <!-- COSButton
            :button-text="$t('views.app.digital-twin-view.tutorial-button')"
            button-style="text"
            suffix="src/assets/icons/ArrowRight.svg"
            :button-size="isMobile ? 'small' : 'medium'"></COSButton -->
        </div>
        <iframe
          class="digital-twin-iframe"
          :src="digitalTwinUrl"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.digital-twin-iframe {
  flex: 1 2 85vh;
  border-radius: 8px;
}

.header-title {
  width: 100%;
  color: v-bind(primaryColor);
  font-family: Inter, serif;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 34px;
}

.header-subtitle {
  color: #1a2025;
  font-family: Inter, serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
}

.header-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;

  border: 1.8px solid transparent;
  border-radius: 8px;
  border-image: linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%) 1 1 1 1;
  background:
    url("src/assets/images/hero-card-bg.png") center / cover no-repeat,
    linear-gradient(rgba(255, 255, 255, 1) 16%, rgba(196, 196, 196, 0.00) 150%) border-box
  ;
  backdrop-filter: blur(20px);
}

.header-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: start;
  padding: 1rem 0;
}
@media (max-width: 1033px) {
  .digital-twin {
    width: 100%;
    padding: 0;
  }

  .header-title {
    font-size: 1.25rem;
  }
  .header-subtitle {
    font-size: 0.85rem;
  }
  .header-container {
    padding: 0.5rem;
  }
  .header-content {
    padding: 1rem 0.5rem;
    gap: 0.5rem;
  }
}

@media (min-width: 1033px) {
  .digital-twin {
    width: calc(100dvw - 73px);
    padding: 1.5rem;
  }
  .digital-twin-iframe {
    flex: 1 2 82vh;
  }
}
</style>
