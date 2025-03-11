<script>
export default {
  name: 'Dropup',
  props: {
    groupName: {
      type: String,
    },
    groupItems: {
      type: Array,
    },
    show: {
      type: Boolean,
    },
    isCatalog: {
      type: Boolean,
    },
    isOperator: {
      type: Boolean,
    },
  },
}
</script>

<template>
  <div v-if="(show && !isCatalog) || (show && isCatalog && isOperator)" class="btn-group dropup">
    <button type="button" class="dpi-menu-dropup-btn btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ groupName }} <span class="caret" />
    </button>
    <ul class="dropdown-menu">
      <li v-for="item in groupItems" :key="item.key" :data-cy="item.key">
        <!-- Menu items are either buttons or router-link -->
        <!-- depending if they have a 'to' or 'handler' property -->
        <component
          :is="item.handler ? 'a' : 'router-link'"
          class="dropdown-item"
          :class="{ disabled: item.disabled }"
          :to="item.to || { name: 'Datasets' }"
          :href="item.handler ? '#' : ''"
          @click="item.handler ? item.handler() : null"
        >
          {{ item.name }}
        </component>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
button.dpi-menu-dropup-btn {
  color:white;
}
</style>
