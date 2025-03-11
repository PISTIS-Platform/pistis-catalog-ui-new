<script setup lang="ts">
import KTag from '../base/tag/KTag.vue'

const props = defineProps<{
  idName: string
  groupName?: string
  label?: string
}>()

const emit = defineEmits<{
  click: [id: string]
}>()
</script>

<template>
  <button
    tabindex="-1"
    @click="emit('click', props.idName)"
  >
    <KTag removable>
      <slot>{{ props.label }}</slot>
    </KTag>
  </button>
</template>
