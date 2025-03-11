<script setup lang="ts">
import { ref } from 'vue'
import KRadioButton from './KRadioButton.vue'

const ingredient = ref('')
</script>

<template>
  <Story title="Base Components/RadioButton">
    <div class="flex flex-col flex-wrap gap-3">
      <div class="flex items-center">
        <KRadioButton
          v-model="ingredient"
          input-id="ingredient1"
          name="pizza"
          value="Cheese"
        >
          Cheese
        </KRadioButton>
      </div>
      <div class="flex items-center">
        <KRadioButton
          v-model="ingredient"
          input-id="ingredient2"
          name="pizza"
          value="Mushroom"
        >
          Mushroom
        </KRadioButton>
      </div>
      <div class="flex items-center">
        <KRadioButton
          v-model="ingredient"
          input-id="ingredient3"
          name="pizza"
          value="Pepper"
        >
          Pepper
        </KRadioButton>
      </div>
      <div class="flex items-center">
        <KRadioButton
          v-model="ingredient"
          input-id="ingredient4"
          name="pizza"
          value="Onion"
        >
          Onion
        </KRadioButton>
      </div>
    </div>
  </Story>
</template>

<style scoped></style>
