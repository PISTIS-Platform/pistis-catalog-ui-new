<script setup lang="ts">
import SuggestedDatasetCard from './SuggestedDatasetCard.vue'
</script>

<template>
  <Story title="Components/Suggested Dataset Card">
    <div class="dark">
      <div class="bg-blue-900 dark:bg-green-100">
        hello world
      </div>
    </div>
    <div class="flex flex-col gap-4 p-4 bg-[#0a2030]">
      <SuggestedDatasetCard
        id="a"
        title="Test Dataset"
        description="This is a test dataset"
        :formats="['CSV', 'JSON', 'XML', 'XLSX']"
        catalog="Verkehrsgesellschaft"
      />
      <div class="dark">
        <SuggestedDatasetCard
          id="a"
          title="Test Dataset"
          description="This is a test dataset"
          :formats="['CSV', 'JSON', 'XML', 'XLSX']"
          catalog="Verkehrsgesellschaft"
          dark
        />
      </div>
    </div>
  </Story>
</template>
