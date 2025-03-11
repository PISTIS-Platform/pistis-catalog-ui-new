<script setup>
import { logEvent } from 'histoire/client'
import { ref } from 'vue'
import KButton from './KButton.vue'

const text = ref('Neue Daten')
</script>

<template>
  <Story
    title="Base Components/Button"
    :layout="{ type: 'grid' }"
  >
    <Variant title="Severity">
      <div class="flex flex-wrap justify-center gap-3 p-4">
        <KButton
          :label="text"
          @click="logEvent('click', $event)"
        />
        <KButton
          :label="text"
          severity="secondary"
          @click="logEvent('click', $event)"
        />
        <KButton
          :label="text"
          severity="tertiary"
          @click="logEvent('click', $event)"
        />
      </div>
    </Variant>
    <Variant title="Severity (small)">
      <div class="flex flex-wrap justify-center gap-3 p-4">
        <KButton
          size="small"
          :label="text"
          @click="logEvent('click', $event)"
        />
        <KButton
          size="small"
          :label="text"
          severity="secondary"
          @click="logEvent('click', $event)"
        />
        <KButton
          size="small"
          :label="text"
          severity="tertiary"
          @click="logEvent('click', $event)"
        />
      </div>
    </Variant>
    <Variant title="Severity (large)">
      <div class="flex flex-wrap justify-center gap-3 p-4">
        <KButton
          size="large"
          :label="text"
          @click="logEvent('click', $event)"
        />
        <KButton
          size="large"
          :label="text"
          severity="secondary"
          @click="logEvent('click', $event)"
        />
        <KButton
          size="large"
          :label="text"
          severity="tertiary"
          @click="logEvent('click', $event)"
        />
      </div>
    </Variant>
    <Variant title="Severity (dark)">
      <div class="dark flex flex-wrap justify-center gap-3 bg-primary-110 p-4">
        <KButton
          :label="text"
          @click="logEvent('click', $event)"
        />
        <KButton
          :label="text"
          severity="secondary"
          @click="logEvent('click', $event)"
        />
        <KButton
          :label="text"
          severity="tertiary"
          @click="logEvent('click', $event)"
        />
      </div>
    </Variant>
    <Variant title="Rounded">
      <div class="flex flex-wrap justify-center gap-3">
        <KButton
          rounded
          :label="text"
          @click="logEvent('click', $event)"
        />
        <KButton
          rounded
          :label="text"
          severity="secondary"
          @click="logEvent('click', $event)"
        />
      </div>
    </Variant>
    <Variant title="Icon">
      <div class="flex flex-wrap justify-center gap-3">
        <KButton
          icon="icon-[ph--download]"
          :label="text"
          icon-pos="left"
          @click="logEvent('click', $event)"
        />
        <KButton
          icon="icon-[ph--download]"
          :label="text"
          severity="secondary"
          icon-pos="left"
          @click="logEvent('click', $event)"
        />
      </div>
    </Variant>
    <Variant title="icon only">
      <KButton
        icon="icon-[ph--download]"
        @click="logEvent('click', $event)"
      />
    </Variant>
    <Variant title="loading">
      <KButton
        loading
        @click="logEvent('click', $event)"
      />
    </Variant>
    <Variant>
      <KButton
        rounded
        @click="logEvent('click', $event)"
      >
        {{ text }}
      </KButton>
    </Variant>

    <template #controls>
      <HstText
        v-model="text"
        title="default slot"
      />
    </template>
  </Story>
</template>
