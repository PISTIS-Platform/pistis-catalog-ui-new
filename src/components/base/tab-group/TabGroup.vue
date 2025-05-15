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
        class="-mb-px flex"
        aria-label="Tabs"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :disabled="tab.disabled"
          class="w-full rounded-t-lg border-b-0 px-6 py-4 text-center text-sm font-semibold transition-colors duration-200" :class="[
            activeTab === tab.id
              ? 'bg-white text-primary active:border-primary'
              : 'hover:text-fg/90 border-transparent bg-surface-100 text-fg-muted hover:bg-surface-50',
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
        class="prose max-w-none rounded-xl bg-surface px-6 py-10"
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
