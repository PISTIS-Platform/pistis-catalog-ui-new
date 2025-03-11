<script>
import COSAppLayout from '@/components/city-os/layout/COSAppLayout.vue'

export default {
  name: 'AppView',
  components: { COSAppLayout },
}
</script>

<template>
  <COSAppLayout />
  <div class="app-content">
    <RouterView />
  </div>
</template>

<style scoped>
@media (max-width: 1032px) {
  .app-content {
    /* padding-top: 71px; */
    height: calc(100dvh - 73px);
  }
}

@media (min-width: 1033px) {
  .app-content {
    /* padding-top: 73px; */
    padding-left: 72px;
    height: calc(100dvh - 72px);
    /* width: calc(100dvw - 73px); */
  }
}
</style>
