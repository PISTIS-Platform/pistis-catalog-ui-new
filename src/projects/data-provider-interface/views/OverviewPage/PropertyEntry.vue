<script>
import generalHelper from '../../utils/general-helper'
import SpecialProp from './Properties/SpecialProp.vue'
import StringProp from './Properties/StringProp.vue'
import URIProp from './Properties/URIProp.vue'

import URLProp from './Properties/URLProp.vue'

export default {
  components: {
    URIProp,
    URLProp,
    StringProp,
    SpecialProp,
  },
  props: {
    profile: String,
    data: Object,
    property: String,
    value: Object,
    dpiLocale: String,
    distId: Number,
    type: String,
  },
  computed: {
    isSet() {
      return generalHelper.propertyHasValue(this.data[this.property])
    },
  },
}
</script>

<template>
  <div>
    <tr v-if="isSet" class="align-items-center">
      <!-- <td class=" font-weight-bold" v-if="value.type !== 'special'">{{ $t(`${value.label}`) }}:</td> -->
      <URIProp
        v-if="value.type === 'singularURI' || value.type === 'multiURI' || value.type === 'singularURI'"
        :property="property" :value="value" :data="data"
      />
      <URLProp
        v-if="value.type === 'singularURL' || value.type === 'multiURL'" :property="property" :value="value"
        :data="data"
      />
      <StringProp
        v-if="value.type === 'singularString' || value.type === 'multiString'" :property="property"
        :value="value" :data="data" :dpi-locale="dpiLocale"
      />

      <!-- SPECIAL -->
      <div v-if="value.type === 'special'" class="w-100">
        <div v-if="property === 'dct:publisher' || property === 'dct:license'">
          <SpecialProp :property="property" :value="value" :data="data" :dpi-locale="dpiLocale" />
        </div>
        <div
          v-else-if="property != 'dct:creator' && property != 'dcat:temporalResolution' && property != 'spdx:checksum'"
        >
          <div v-for="(elem, index) in data[property]" :key="index">
            <SpecialProp :property="property" :value="value" :data="elem" :dpi-locale="dpiLocale" />
          </div>
        </div>
        <div v-else>
          <SpecialProp :property="property" :value="value" :data="data[property]" :dpi-locale="dpiLocale" />
        </div>
      </div>
    </tr>
  </div>
</template>
