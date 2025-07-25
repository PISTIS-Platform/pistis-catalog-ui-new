<template>
    <div class="meta-info">
      <div v-if="isObject(data)" class="demacator">
        <div v-for="(value, key) in data" :key="key">
          <p>{{ key }}:</p>
          <div v-if="Array.isArray(value)">
          
            <ul>
              <li v-for="(item, index) in value" :key="index">
                <Metadata :data="item" />
              </li>
            </ul>
          </div>
          <Metadata v-else :data="value" />
        </div>
      </div>
  
      <div v-else-if="Array.isArray(data)">
   
        <ul>
          <li v-for="(item, index) in data" :key="index">
            <Metadata :data="item" />
          </li>
        </ul>
      </div>
  
      <span v-else>{{ data }}</span>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    data: {
      type: [Object, Array, String, Number, Boolean],
      required: true
    }
  });
  

  const isObject = (value) => {
    return value && typeof value === 'object' && !Array.isArray(value);
  };
  </script>
  
  <style scoped>
  p, span{
    color: #71717a;
  }

  p{
    font-weight: 700;
  }
  .demacator{
    display: flex;
    gap: 1rem;
  }
  </style>
  