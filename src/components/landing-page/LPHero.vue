<script lang="ts">
import Typography from '@/components/base/typography/Typography.vue'
import { defineComponent } from 'vue'

import SectionLandingPageBase from './SectionLandingPageBase.vue'

export default defineComponent({
  components: {
    SectionLandingPageBase,
    Typography,
  },
  data() {
    return {
      categories: [
        { label: 'Verkehr', query: 'verkehr' },
        { label: 'Windenergie', query: 'windenergie' },
        { label: 'Schlösser', query: 'schlösser' },
      ],
      query: '',
    }
  },
  methods: {
    submitSearch() {
      // @ts-expect-error
      this.$router.push({ path: '/datasets', query: { query: this.query, locale: 'de' } })
    },
  },
})
</script>

<template>
  <SectionLandingPageBase
    big
    class="relative px-8 xl:px-0"
  >
    <template #title>
      <h2>Bayerns Digitale Zwillinge</h2>
    </template>
    <div class="relative z-10 lg:w-1/2">
      <form
        class="flex mb-2"
        @submit.prevent="submitSearch"
      >
        <input
          v-model="query"
          type="text"
          class="flex-1 h-[52px] px-4 bg-[#0B1A25] text-neutral-300 border border-[#687178] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="twins suchen"
          aria-label="Suchbegriff"
        >
        <button
          class="ml-2 w-[52px] h-[52px] flex items-center justify-center bg-[#003F6F] rounded-full hover:bg-[#004d87] transition-colors"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.5306 20.4693L16.8365 15.7762C18.1971 14.1428 18.8755 12.0478 18.7307 9.92691C18.5859 7.80604 17.629 5.82265 16.0591 4.38932C14.4892 2.95599 12.4271 2.18308 10.3019 2.23138C8.17663 2.27968 6.15181 3.14547 4.64864 4.64864C3.14547 6.15181 2.27968 8.17663 2.23138 10.3019C2.18308 12.4271 2.95599 14.4892 4.38932 16.0591C5.82265 17.629 7.80604 18.5859 9.92691 18.7307C12.0478 18.8755 14.1428 18.1971 15.7762 16.8365L20.4693 21.5306C20.539 21.6003 20.6218 21.6556 20.7128 21.6933C20.8038 21.731 20.9014 21.7504 21 21.7504C21.0985 21.7504 21.1961 21.731 21.2871 21.6933C21.3782 21.6556 21.4609 21.6003 21.5306 21.5306C21.6003 21.4609 21.6556 21.3782 21.6933 21.2871C21.731 21.1961 21.7504 21.0985 21.7504 21C21.7504 20.9014 21.731 20.8038 21.6933 20.7128C21.6556 20.6218 21.6003 20.539 21.5306 20.4693ZM3.74997 10.5C3.74997 9.16495 4.14585 7.8599 4.88755 6.74987C5.62925 5.63984 6.68345 4.77467 7.91686 4.26378C9.15026 3.75289 10.5075 3.61922 11.8168 3.87967C13.1262 4.14012 14.3289 4.78299 15.2729 5.727C16.2169 6.671 16.8598 7.87374 17.1203 9.18311C17.3807 10.4925 17.247 11.8497 16.7362 13.0831C16.2253 14.3165 15.3601 15.3707 14.2501 16.1124C13.14 16.8541 11.835 17.25 10.5 17.25C8.71037 17.248 6.99463 16.5362 5.72919 15.2707C4.46375 14.0053 3.75195 12.2896 3.74997 10.5Z"
              fill="#FAFAFB"
            />
          </svg>
        </button>
      </form>

      <div class="flex gap-4 mb-5 font-bold text-sm">
        <router-link
          v-for="(category, index) in categories"
          :key="index"
          :to="{ name: 'Datasets', query: { query: category.query, locale: 'de' } }"
          class="text-primary-pressed before:content-['->_']"
        >
          {{ category.label }}
        </router-link>
      </div>

      <p class="">
        Auf twin.bydata entdecken Sie digitale Zwillinge und erhalten Unterstützung, um ihre eigenen Zwillinge zu
        erstellen und zu teilen. Gemeinsam- ob Verwaltung, Wissenschaft oder Zivilgesellschaft - nutzen wir dir
        Potenziale digitaler Abbilder, um Mehrwert für alle zu schaffen.
      </p>
    </div>

    <!-- Background illustration -->
    <div class="absolute inset-0 opacity-50 lg:opacity-100 select-none">
      <img
        src="../../assets/images/landing/top-illu--web.svg"
        alt="Background illustration"
        class="absolute w-full md:w-[711px] h-[948px] -top-[217px] sm:left-auto sm:-right-[180px] sm:-top-[284px] xl:-right-[228px] xl:-top-[302px] object-cover"
      >
    </div>
  </SectionLandingPageBase>
</template>
