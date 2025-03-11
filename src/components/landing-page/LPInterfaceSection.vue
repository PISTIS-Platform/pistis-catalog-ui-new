<script lang="ts">
import KButton from '@/components/base/button/KButton.vue'

import SectionLandingPageBase from '@/components/landing-page/SectionLandingPageBase.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ApiSection',
  components: { SectionLandingPageBase, KButton },
})
</script>

<template>
  <SectionLandingPageBase>
    <template #title>
      Daten über unsere Schnittstellen nutzen
    </template>
    <div class="mb-40">
      <div class="flex flex-col lg:flex-row items-center">
        <div class="w-full lg:w-1/2 relative h-[25rem]">
          <img
            class="absolute h-[25rem] min-w-[25rem] left-1/2 -ml-[12.5rem]"
            src="../../assets/images/landing/apis-illu.svg"
            alt="APIs Illustration"
          >
        </div>
        <div class="w-full lg:w-1/2 flex flex-col gap-8 px-12">
          <img
            class="w-16 h-16"
            src="../../assets/images/landing/api-1.svg"
            alt="APIs Illustration"
          >
          <p>
            Neben der Datensuche stellen wir drei Schnittstellen frei zur Verfügung – für Suchen und zur
            Datenverarbeitung sowie den direkten Zugriff über unsere SPARQL-Schnittstelle.
          </p>
          <KButton>
            <a href="/api"> Zur API-Dokumentation </a>
          </KButton>
        </div>
      </div>
    </div>
  </SectionLandingPageBase>
</template>
