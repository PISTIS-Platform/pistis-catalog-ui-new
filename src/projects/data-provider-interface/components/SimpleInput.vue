<script setup>
import { FormKit } from '@formkit/vue'
import { computed } from 'vue'

const props = defineProps({
  context: Object,
})
// Need to make  sure, that the right header gets displayed
const inDis = computed(() => {
  try {
    if (props.context.attrs.class.includes('inDistribution')) {
      return true
    }
  }
  catch (error) {

  }
})
</script>

<template>
  <div class="formkitProperty">
    <h4 v-if="!props.context.attrs.insideRepeatable && !inDis">
      {{ $t(`message.dataupload.datasets.${
        props.context.attrs.identifier}.label`) }}
    </h4>
    <h4 v-if="inDis">
      {{ $t(`message.dataupload.distributions.${
        props.context.attrs.identifier}.label`) }}
    </h4>
    <div class="position-relative formkitCmpWrap">
      <FormKit
        class="autocompleteInputfield" :identifier="props.context.attrs.identifier"
        :name="props.context.node.name" :help="props.context.help"
        :placeholder="props.context.attrs.placeholder" :validation="props.context.attrs.validationType"
      />
    </div>
  </div>
</template>

<style></style>
