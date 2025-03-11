<script>
import { has, isEmpty, isNil } from 'lodash-es'

export default {
  components: {
  },
  props: {
    property: String,
    value: Object,
    data: undefined,
  },
  methods: {
    showValue(property, value) {
      return has(property, value) && !isNil(property[value]) && !isEmpty(property[value])
    },
  },

}
</script>

<template>
  <div v-if="value.type === 'conditional'">
    <!-- PUBLISHER -->
    <div v-if="property === 'dct:publisher'">
      <details>{{ value }}</details>

      <!--
            <div v-if="!data[property][0]['resource']">
                <details>{{ data[property][0]['name'] }}</details>
                <td>
                    <div v-if="showValue(data[property][0], 'foaf:name')">
                        <span class="">{{ $t('message.dataupload.datasets.publisherName.label') }}:</span>
                        {{ data[property][0]['foaf:name'] }}

                    </div>
                    <div v-if="showValue(data[property][0], 'foaf:mbox')" class="pr-1">

                        <span class="">{{ $t('message.dataupload.datasets.publisherEmail.label') }}:</span>
                        <app-link class="w-100" :to="data[property][0]['foaf:mbox']">{{ data[property][0]['foaf:mbox']
                        }}</app-link>
                    </div>
                    <div v-if="showValue(data[property][0], 'foaf:homepage')" class="pr-1">

                        <span class="">{{ $t('message.dataupload.datasets.publisherHomepage.label') }}:</span>
                        <app-link class="w-100" :to="data[property][0]['foaf:homepage']">{{
                            data[property][0]['foaf:homepage'] }}</app-link>
                    </div>
                </td>
            </div>
            <div v-else>
                {{ value.type = 'singularURI' }}
                <URIProp :property="property" :value="value" :data="data">{{ value.type }}</URIProp>
            </div> -->
    </div>
  </div>
</template>
