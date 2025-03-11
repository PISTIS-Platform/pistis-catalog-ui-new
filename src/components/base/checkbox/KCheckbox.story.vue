<script setup lang="ts">
import { logEvent } from 'histoire/client'
import { ref } from 'vue'
import KCheckbox from './KCheckbox.vue'

const checked = ref(false)
const pizza = ref('')
const list = ref([])

const checkboxes = ref([
  { inputId: 'science', name: 'science', value: 'science', label: 'Wissenschaft und Technologien' },
  { inputId: 'economy', name: 'economy', value: 'economy', label: 'Wirtschaft' },
  { inputId: 'politics', name: 'politics', value: 'politics', label: 'Politik' },
  { inputId: 'society', name: 'society', value: 'society', label: 'Gesellschaft' },
  { inputId: 'culture', name: 'culture', value: 'culture', label: 'Kultur' },
  { inputId: 'sports', name: 'sports', value: 'sports', label: 'Sport' },
  { inputId: 'health', name: 'health', value: 'health', label: 'Gesundheit' },
  { inputId: 'environment', name: 'environment', value: 'environment', label: 'Umwelt' },
  { inputId: 'traffic', name: 'traffic', value: 'traffic', label: 'Verkehr' },
  { inputId: 'education', name: 'education', value: 'education', label: 'Bildung' },
  { inputId: 'other', name: 'other', value: 'other', label: 'Sonstiges' },
])
</script>

<template>
  <Story
    title="Base Components/Checkbox"
    :layout="{ type: 'grid', width: 600 }"
  >
    <Variant title="Default">
      <div class="mb-1">
        v-model: {{ checked }}
      </div>
      <KCheckbox
        v-model="checked"
        binary
        @blur="logEvent('blur', $event)"
        @focus="logEvent('focus', $event)"
        @change="logEvent('change', $event)"
      />
    </Variant>
    <Variant title="Label">
      <div class="mb-1">
        v-model: {{ pizza }}
      </div>
      <KCheckbox
        v-model="pizza"
        input-id="pizza"
        name="pizza"
        value="Cheese"
      >
        Pizza
      </KCheckbox>
    </Variant>
    <Variant title="List">
      <div class="flex flex-col gap-2">
        <div class="mb-1">
          v-model: {{ list }}
        </div>
        <KCheckbox
          v-for="checkbox in checkboxes"
          :key="checkbox.value"
          v-model="list"
          :input-id="checkbox.inputId"
          :name="checkbox.name"
          :value="checkbox.value"
        >
          {{ checkbox.label }}
        </KCheckbox>
      </div>
      <template #controls>
        hello
      </template>
    </Variant>
  </Story>
</template>
