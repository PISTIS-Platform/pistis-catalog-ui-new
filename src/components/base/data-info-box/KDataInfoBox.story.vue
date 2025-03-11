<script setup lang="ts">
import { ref } from 'vue'
import PhGlobeHemisphereWestLight from '~icons/ph/globe-hemisphere-west-light'
import KDataInfoBox from './KDataInfoBox.vue'

const superTitle = ref('Mainzer Verkehrsgesellschaft')
const title = ref('Flächennutzung/ Verkehrsfläche Stadt Ingolstadt')
const formats = ref(['CSV', 'JSON', 'XML', 'XLSX'])
const categories = ref(['Verkehr', 'Umwelt', 'Energie'])
const issued = ref('12.03.2024')
</script>

<template>
  <Story title="Components/DataInfoBox">
    <Variant title="Default">
      <div class="m-1">
        <KDataInfoBox
          :super-title="superTitle"
          :title="title"
          :formats="formats"
          :issued="issued"
          :categories="categories"
          dataset-type="opendata"
        />
      </div>
    </Variant>
    <Variant title="Ghost">
      <div class="m-1">
        <KDataInfoBox
          :super-title="superTitle"
          :title="title"
          :formats="formats"
          :issued="issued"
          :categories="categories"
          ghost
        >
          <template #icon>
            <PhGlobeHemisphereWestLight class="text-xl" />
          </template>
        </KDataInfoBox>
      </div>
    </Variant>
  </Story>
</template>
