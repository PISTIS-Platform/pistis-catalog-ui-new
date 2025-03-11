<script setup>
import { logEvent } from 'histoire/client'
import { ref } from 'vue'
import KTag from './KTag.vue'

const text = ref('Neue Daten')
</script>

<template>
  <Story
    title="Tags"
    :layout="{ type: 'grid' }"
  >
    <Variant title="Static">
      <KTag
        label="Verkehr"
        @remove="logEvent('remove', $event)"
      />
    </Variant>
    <Variant title="Interactive">
      <KTag
        interactive
        label="Verkehr"
        @remove="logEvent('remove', $event)"
      />
    </Variant>
    <Variant title="With Icon">
      <KTag
        interactive
        label="Verkehr"
        icon="icon-[ph--info]"
        @remove="logEvent('remove', $event)"
      />
    </Variant>
    <Variant title="With Icon Right">
      <KTag
        label="Verkehr"
        icon-right="icon-[ph--magnifying-glass]"
        @remove="logEvent('remove', $event)"
      />
    </Variant>
    <Variant title="Interactive Unselected">
      <KTag
        interactive
        unselected
        label="Verkehr"
        @remove="logEvent('remove', $event)"
      />
    </Variant>
    <Variant title="Disabled">
      <KTag
        interactive
        disabled
        label="Verkehr"
        @remove="logEvent('remove', $event)"
      />
    </Variant>
  </Story>
</template>
