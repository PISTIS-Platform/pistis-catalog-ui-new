<script setup>
import { ref } from 'vue'

const props = defineProps({
  context: Object,
})

const counter = ref([])

// Need to handle the data like this. The values seem to take their time while loading into the DOM.
setTimeout(() => {
  if (props.context.value.length === 0) {
    counter.value.push('init')
  }
  else {
    for (let index = 0; index < props.context.value.length; index++) {
      if (props.context.value[index] != null) {
        counter.value.push(props.context.value[index]['@value'])
      }
    }
  }
})

// Pushing a blank to the context object and refreshing the counter
function addItem(index) {
  counter.value.push(props.context.value[index]['@value'])
}
// remove Item - ToDo need to make sure the localhost notices the splice
function removeItem(index, counterLength) {
  if (counterLength != 1) {
    counter.value.splice(index, 1)
  }
}
</script>

<template>
  <div
    v-for="key, repeatableIndex in counter" :key="key"
    class="repeatable formkitProperty" :class="[props.context.attrs.identifier]"
  >
    <h4 v-if="props.context.attrs.class != undefined && props.context.attrs.class.includes('inDistribution')">
      {{
        $t(`message.dataupload.distributions.${props.context.attrs.identifier}.label`) }}
    </h4>
    <h4 v-else>
      {{ $t(`message.dataupload.datasets.${props.context.attrs.identifier}.label`) }}
    </h4>
    <div class="horizontal-wrapper">
      <div class="repeatableWrap">
        <div class="interactionHeaderRepeatable my-1">
          <i18n-t keypath="message.dataupload.info.repeatable" scope="global" tag="p">
            <template #add>
              <a class="add" @click="addItem(repeatableIndex)">+ {{ $t('message.dataupload.info.add') }}</a>
            </template>
            <template #remove>
              <a
                class="remove" :class="{ disabledRemove: props.context.value.length === 1 }"
                :data-key="key" @click="removeItem(repeatableIndex, counter.length)"
              >- {{
                $t('message.dataupload.info.remove') }}</a>
            </template>
          </i18n-t>
        </div>
        <div class="formkitWrapRepeatable">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add,
.remove {
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 5px;
  transition: all 200ms ease-in-out;
}

.add {
  border: 1px solid lightseagreen;

  &:hover {
    text-decoration: none;
    color: white;
    background-color: lightseagreen;
  }
}

.remove {
  border: 1px solid lightcoral;

  &:hover {
    text-decoration: none;
    color: white;
    background-color: lightcoral;
  }
}

.disabledRemove {
  &:hover {
    text-decoration: none;
    color: white;
    background-color: lightgray;
  }
}
</style>
