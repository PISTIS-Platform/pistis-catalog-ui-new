<script setup lang="ts">
import type { JSX } from 'vue/jsx-runtime'
import { ref, watch } from 'vue'
import Typography from '../typography/Typography.vue'

export interface TabItem {
  id: string
  title: string
  content: string | JSX.Element
  isActive?: boolean
  disabled?: boolean
}

interface Props {
  tabs: TabItem[]
  activeTabId?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  activeTabId: '',
  className: '',
})

const emit = defineEmits<(e: 'tabChange', tabId: string) => void>()

const activeTab = ref(props.activeTabId || props.tabs[0]?.id || '')

watch(
  () => props.activeTabId,
  (newValue) => {
    if (newValue) {
      activeTab.value = newValue
    }
  },
)

function setActiveTab(tabId: string) {
  activeTab.value = tabId
  emit('tabChange', tabId)
}
</script>

<template>
  <div class="w-full" :class="[className]">
    <!-- Tab Navigation -->
    <div v-if="tabs.length > 1" class="border-b border-surface-50">
      <nav
        class="flex -mb-px"
        aria-label="Tabs"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :disabled="tab.disabled"
          class="w-full font-semibold border-b-0 py-4 px-6 text-center text-sm rounded-t-lg transition-colors duration-200" :class="[
            activeTab === tab.id
              ? 'active:border-primary text-primary bg-white'
              : 'border-transparent hover:text-fg/90 bg-surface-100 hover:bg-surface-50 text-fg-muted',
          ]"
          :aria-current="activeTab === tab.id ? 'page' : undefined"
          :aria-selected="activeTab === tab.id"
          role="tab"
          @click="setActiveTab(tab.id)"
        >
          {{ tab.title }}
        </button>
      </nav>
    </div>

    <!-- Tab Panels -->
    <div class="">
      <div
        v-for="tab in tabs"
        v-show="activeTab === tab.id"
        :key="tab.id"
        class="prose max-w-none py-10 px-6 bg-white rounded-sm"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.id}`"
      >
        <slot :id="tab.id" :content="tab.content">
          <Typography
            as="p"
            variant="by-copy-small-regular"
            class="text-fg-muted"
          >
            {{ tab.content }}
          </Typography>
        </slot>
      </div>
    </div>
  </div>
</template>
