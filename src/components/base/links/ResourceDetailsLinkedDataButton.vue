<template>
  <app-link :to="createLinkedDataURL()" target="_blank" is-tooltip="true">
    {{ text }}
  </app-link>
</template>

<script>
  // Import components used in template
  import AppLink from "./AppLink.vue";
  // Import glue-config.js

  export default {
    name: 'ResourceDetailsLinkedDataButton',
    components: {
      AppLink,
    },
    data() {
      return {};
    },
    props: {
      text: {
        type: String,
        default: '',
      },
      format: {
        type: String,
        default: '',
        required: true,
      },
      resourcesId: {
        type: String,
        default: '',
        required: true,
      },
      resources: {
        type: String,
        default: '',
        required: true,
      },
    },
    computed: {},
    methods: {
      createLinkedDataURL() {
        if (this.resources === 'distributions') {
          return `${this.$env.api.hubUrl}distributions/${this.resourcesId}.${this.format}`;
        } if (this.resources === 'datasets') {
          return `${this.$env.api.hubUrl}datasets/${this.resourcesId}.${this.format}?useNormalizedId=true&locale=${this.$route.query.locale}`;
        } if (this.resources === 'catalogues') {
          return `${this.$env.api.hubUrl}catalogues/${this.resourcesId}.${this.format}`;
        }
        return '';
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
