<script setup lang="ts">
import { ref } from 'vue'
import DashboardRadioButton from './DashboardRadioButton.vue'

const pick = ref('')
</script>

<template>
  <Story title="Components/DashboardRadioButton">
    <div class="w-[269px] h-[600px]">
      <DashboardRadioButton
        v-model="pick"
        class="w-[269px] h-[60 0px]"
        input-id="verkehr"
        input-value="verkehr"
        title="Stadtverkehr Übersicht"
      />
      <DashboardRadioButton
        v-model="pick"
        class="w-[269px] h-[60 0px]"
        input-id="social"
        input-value="social"
        title="Stadtverkehr Übersicht"
      />
    </div>
  </Story>
</template>

<style scoped></style>
