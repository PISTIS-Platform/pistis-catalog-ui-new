<script setup>
const props = defineProps({
  route: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconActive: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Icon',
  },
  title: {
    type: String,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    v-slot="{ href, navigate, isActive }"
    :to="props.route"
    custom
  >
    <a
      class="sidebar-icon-container"
      :class="{ active: isActive, expanded: props.expanded }"
      :href="href"
      :title="props.title.length > 20 ? props.title : ''"
      @click="navigate"
    >
      <img
        class="sidebar-icon"
        :src="isActive ? props.iconActive : props.icon"
        :alt="props.alt"
      >
      <span
        v-if="props.expanded"
        class="icon-title"
      >{{ props.title }}</span>
    </a>
  </RouterLink>
</template>

<style scoped>
.sidebar-icon-container {
  padding: 8px;
  height: 52px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition:
    background-color 0.3s,
    width 0.3s,
    padding 0.3s;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.sidebar-icon-container.expanded {
  justify-content: flex-start;
}

.active {
  background-color: #f4f6f9;
}

.sidebar-icon-container:hover {
  background-color: #f4f6f9;
}

.sidebar-icon {
  width: 32px;
  height: 32px;
}

.icon-title {
  margin-left: 16px;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  color: #33404a;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}
</style>
