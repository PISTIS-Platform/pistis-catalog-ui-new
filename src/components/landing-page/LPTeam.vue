<script lang="ts">
import KButton from '@/components/base/button/KButton.vue'
import { defineComponent } from 'vue'
import SectionLandingPageBase from './SectionLandingPageBase.vue'

export default defineComponent({
  components: {
    KButton,
    SectionLandingPageBase,
  },
})
</script>

<template>
  <SectionLandingPageBase
    small
    class="bayern-landing-page__section bayern-landing-page__section--four"
  >
    <template #title>
      oc.bydata, das open bydata competence center
    </template>
    <div class="flex flex-wrap justify-center gap-10 text-center">
      <div class="w-full">
        <p class="text-center text-base">
          Als Kompetenzzentrum für das Thema Open Data in Bayern stärken wir Kompetenzen in der Verwaltung, entwickeln
          innovative Lösungen für vernetzte Daten im Sinne von Linked Open Data und schaffen gemeinsam mit Open Data
          Communities echten Mehrwert.
          <br><br>
          Arbeite mit uns gemeinsam an einem besseren Bayern durch Daten: Einfach, vertrauenswürdig, vernetzt.
        </p>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="flex w-full flex-wrap justify-center gap-32 px-8 py-12">
          <img
            class="h-28 w-auto"
            src="../../assets/images/landing/team/Luis.png"
            alt="Luis Moßburger auf einem isometrischen Muster"
          >
          <img
            class="h-28 w-auto"
            src="../../assets/images/landing/team/Ruth.png"
            alt="Ruth Neeser auf einem isometrischen Muster"
          >
          <img
            class="h-28 w-auto"
            src="../../assets/images/landing/team/Mitarbyterin.png"
            alt="Ein isometrisches Muster"
          >
          <img
            class="h-28 w-auto"
            src="../../assets/images/landing/team/Bianca.png"
            alt="Bianca Sammer auf einem isometrischen Muster"
          >
        </div>
        <div class="my-20 flex w-full flex-wrap justify-center gap-24 px-8">
          <img
            class="hidden h-24 w-auto"
            src="../../assets/images/landing/team/Kai.png"
            alt="Kai Wanschura auf einem blauen Kreis"
          >
          <img
            class="h-24 w-auto"
            src="../../assets/images/landing/team/Julia.png"
            alt="Julia Radermacher auf einem blauen Kreis"
          >
          <img
            class="h-24 w-auto"
            src="../../assets/images/landing/team/Patryk.png"
            alt="Patryk Brzoza auf einem blauen Kreis"
          >
          <img
            class="hidden h-24 w-auto"
            src="../../assets/images/landing/team/Julian.png"
            alt="Julian Grote auf einem blauen Kreis"
          >
          <img
            class="h-24 w-auto"
            src="../../assets/images/landing/team/Patrick.png"
            alt="Patrick Pöhner auf einem blauen Kreis"
          >
        </div>
        <a href="https://oc.bydata.de">
          <KButton
            severity="secondary"
            class="!border-transparent !bg-primary-10 !text-black hover:!bg-primary-20"
          >Mehr zum Team</KButton>
        </a>
      </div>
    </div>
  </SectionLandingPageBase>
</template>
