<template>
  <nav>
    <!-- Linked Data link-->
    <div class="relative">
      <button class="text-nowrap cursor-pointer underline" @click="toggleDropdown" aria-haspopup="listbox">
        <span
          :title="$t('links.linkedData')"
          data-toggle="tooltip">
          {{ $t('links.linkedData') }}
          <i class="icon-[ph--caret-down] text-xs align-middle" />
        </span>
      </button>
      <div
        v-if="showDropdown"
        class="absolute z-10 w-full top-full border dark:border rounded-md shadow-md bg-surface-0 dark:bg-surface-800 text-surface-800 dark:text-white/80 dark:border-surface-700 max-h-[200px]">
        <ul class="w-full">
          <li class="w-full hover:bg-gray p-1"><resource-details-linked-data-button
          isTooltip="true"
          class="dropdown-item w-full"
          format="rdf"
          text="RDF/XML"
          :resources="resource"
          v-bind:resources-id="resourceId"></resource-details-linked-data-button></li>
          <li class="w-full hover:bg-gray p-1"><resource-details-linked-data-button
          isTooltip="true"
          class="dropdown-item"
          format="ttl"
          text="Turtle"
          :resources="resource"
          v-bind:resources-id="resourceId"></resource-details-linked-data-button>
          </li>
          <li class="w-full hover:bg-gray p-1"><resource-details-linked-data-button
          isTooltip="true"
          class="dropdown-item"
          format="n3"
          text="Notation3"
          :resources="resource"
          v-bind:resources-id="resourceId"></resource-details-linked-data-button></li>
        <li class="w-full hover:bg-gray p-1">
          <resource-details-linked-data-button
          isTooltip="true"
          class="dropdown-item"
          format="nt"
          text="N-Triples"
          :resources="resource"
          v-bind:resources-id="resourceId"></resource-details-linked-data-button>
        </li>
        <li class="w-full hover:bg-gray p-1">
          <resource-details-linked-data-button
          isTooltip="true"
          class="dropdown-item"
          format="jsonld"
          text="JSON-LD"
          :resources="resource"
          v-bind:resources-id="resourceId"></resource-details-linked-data-button>
        </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'

const ResourceDetailsLinkedDataButton = defineAsyncComponent(() => import('./ResourceDetailsLinkedDataButton.vue'))

const props = defineProps({
  resourceId: {
    type: String,
    required: true,
  },
  resource: {
    type: String
  },
})

const showDropdown = ref(false)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}
</script>

<style>
.dropdown-item :hover {
  background: var(--gray-hover);
}

</style>
