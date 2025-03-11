<script setup lang="ts">
import { computed, inject } from 'vue'
import { dpiStepperKey } from '../utils/injectionKeys'

const props = defineProps<{
  name: string
}>()

const dpiStepper = inject(dpiStepperKey)

if (!dpiStepper) {
  throw new Error('dpiStepper is not provided. Please make sure to use this component inside InputPage')
}

dpiStepper.registerStep(props.name)

const isActive = computed(() => dpiStepper.activeStep.value === props.name)

const {
  activeStep,
} = dpiStepper
</script>

<template>
  <section v-show="isActive" :class="{ activeSection: isActive }">
    <FormKit :id="props.name" :ref="props.name" type="group" :name="props.name">
      <slot />
    </FormKit>
  </section>
</template>

<style scoped></style>
