<script>
import { has, isEmpty, isNil } from 'lodash-es'

export default {
  components: {
  },
  props: {
    property: String,
    value: Object,
    data: Object,
  },
  data() {
    return {
      isEditMode: false,
      contentOfProp: '',
    }
  },
  methods: {
    showValue(property, value) {
      return has(property, value) && !isNil(property[value]) && !isEmpty(property[value])
    },
    async editProp(e) {
      if (this.isEditMode) {
        await this.$formkit.get(e).context.node.input([{ '@id': this.contentOfProp }])
      }
      else {
        this.contentOfProp = this.$formkit.get(e).context.value[0]['@id']
      }
      this.isEditMode = !this.isEditMode
    },
  },
}
</script>

<template>
  <td class="font-weight-bold">
    {{ $t(`${value.label}`) }}
  </td>
  <!-- SINGULAR URL -->
  <td v-if="value.type === 'singularURL'">
    <a :href="data[property]">
      {{ data[property]['@type'] }}
    </a>
  </td>

  <!-- MULTI URLs -->
  <td v-if="value.type === 'multiURL' && data[property][0]['@id'] != ''" class="d-flex align-items-center">
    <div v-if="isEditMode">
      <input v-model="contentOfProp" type="text">
    </div>
    <div v-else>
      <div v-for="(el, index) in data[property]" :key="index">
        <!-- regular multiple URLs -->
        <a v-if="showValue(el, '@id')" :href="el['@id']">
          {{ el['@id'] }}
        </a>
        <!-- IS USED BY -->
        <a v-if="showValue(el, 'dext:isUsedBy')" :href="el['dext:isUsedBy']">
          {{ el['dext:isUsedBy'] }}
        </a>
      </div>
    </div>
    <!-- <div class="infoI" @click="editProp(property)"></div> -->
  </td>
</template>
