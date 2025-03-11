<script lang="ts">
import { defineComponent } from 'vue'

import SectionLandingPageBase from './SectionLandingPageBase.vue'

export default defineComponent({
  name: 'VideoPlayer',
  components: {
    SectionLandingPageBase,
  },
})
</script>

<template>
  <SectionLandingPageBase class="mb-20 w-full">
    <div class="relative w-full pt-[56.25%]">
      <video
        controls
        poster="../../assets/images//landing/video/preview.png"
        class="absolute top-0 left-0 h-full w-full"
      >
        <source
          src="../../assets/images//landing/video/preview.mp4"
          type="video/mp4"
        >
        <track
          kind="subtitles"
          src="../../assets/images//landing/video/preview.vtt"
          srclang="de"
          label="Deutsch"
        >
      </video>
    </div>
  </SectionLandingPageBase>
</template>
