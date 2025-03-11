<script setup lang="ts">
import KButton from '@/components/base/button/KButton.vue'
import Typography from '@/components/base/typography/Typography.vue'
import appConfig from '../../../../../config/appConfig'

defineProps<{
  authenticated?: boolean
}>()

const primaryColor = appConfig.customer.primaryColor
</script>

<template>
  <div class="relative flex flex-col flex-nowrap overflow-hidden p-6">
    <div class="content-row">
      <div
        name="desc"
        class="z-10 flex max-w-full flex-1 flex-col gap-4"
      >
        <Typography
          class="title"
          as="h2"
          variant="header-2"
        >
          {{ $t('kdw.components.headline.KHeadline.datacatalog') }}
        </Typography>
        <Typography
          class="subtitle"
          as="p"
          variant="paragraph-2"
        >
          {{ $t('kdw.components.headline.KHeadline.datacatalog-text') }}
        </Typography>
      </div>
      <div
        name="buttons"
        class="cos-k-button-container z-10 mt-10 flex flex-none flex-wrap"
        :class="{ invisible: !authenticated }"
      >
        <KButton
          class="cos-k-button"
          severity="secondary"
          :label="$t('kdw.components.headline.KHeadline.organizationData')"
          @click="$router.push('data-catalog/organisation-data')"
        >
          <template #icon>
            <img
              src="../../../../assets/icons/ArrowRight.svg"
              alt="Arrow Right icon"
            >
          </template>
        </KButton>
        <KButton
          class="cos-k-button"
          to="/datasets"
          :label="$t('kdw.components.headline.KHeadline.newData')"
          @click="$router.push('/dpi/datasets')"
        >
          <template #icon>
            <img
              src="../../../../assets/icons/ArrowRight.svg"
              alt="Arrow Right icon"
              style="filter: brightness(100)"
            >
          </template>
        </KButton>
      </div>
    </div>
  </div>
</template>

<style>
.cos-k-button {
  display: flex;
  gap: 8px;
}
</style>

<style scoped>
.title {
  color: v-bind(primaryColor);
  font-family: 'Sofia Sans', serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 45px; /* 125% */
}

.subtitle {
  color: #1a2025;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: justified;
  max-width: 800px;
}
</style>
