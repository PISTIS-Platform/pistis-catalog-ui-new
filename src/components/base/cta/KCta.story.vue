<script setup>
import { ref } from 'vue'
import PhStack from '~icons/ph/stack'
import KCta from './KCta.vue'

const text = ref('Hello World')
</script>

<template>
  <Story
    title="Components/CallToAction"
    :layout="{ type: 'grid', width: 400 }"
  >
    <Variant title="Default">
      <KCta
        title="Daten Analysieren"
        text="Hier kannst du deine Datensets analysieren"
      />
    </Variant>

    <Variant title="Icon">
      <KCta
        title="Daten Analysieren"
        text="Hier kannst du deine Datensets analysieren"
      >
        <template #icon>
          <PhStack class="text-4xl" />
        </template>
      </KCta>
    </Variant>
  </Story>
</template>
