<script lang="ts">
import KButton from '@/components/base/button/KButton.vue'
import { defineComponent } from 'vue'
import SectionLandingPageBase from './SectionLandingPageBase.vue'

export default defineComponent({
  components: {
    SectionLandingPageBase,
    KButton,
  },
})
</script>

<template>
  <SectionLandingPageBase class="section-three">
    <template #title>
      Daten bereitstellen
    </template>
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center gap-4 mb-4">
        <div class="w-full lg:w-1/2">
          <div class="flex flex-col items-start gap-12">
            <p class="">
              Offene Daten schaffen die Basis für innovative Produkte und Services. Das open bydata competence center
              unterstützt bei der Veröffentlichung von Daten mit individueller Beratung und Services.
            </p>
            <KButton>
              <a href="https://twin.bydata.de/sharing">
                <span class="lg:hidden">Mehr Informationen</span>
                <span class="hidden lg:inline">Mehr Informationen zur Datenbereitstellung</span>
              </a>
            </KButton>
          </div>
        </div>
        <div class="w-full lg:w-1/2 h-60 relative grid place-items-center">
          <img
            src="../../assets/images/landing/provide-illu.svg"
            alt=""
            class="absolute w-[534px] h-[448px]"
          >
        </div>
      </div>
      <div class="flex flex-wrap lg:flex-nowrap items-center gap-3">
        <p class="mb-0">
          Eine Vielzahl verschiedener Partner ist schon dabei:
        </p>
        <a
          href="/partners"
          class="font-semiboldhover:underline"
        >Zu unseren Partnern</a>
      </div>
    </div>
  </SectionLandingPageBase>
</template>
