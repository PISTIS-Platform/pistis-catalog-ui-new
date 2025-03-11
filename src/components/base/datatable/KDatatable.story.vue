<script setup lang="ts">
import Column from 'primevue/column'
import { ref } from 'vue'
import KDataTable from './KDataTable.vue'

const products = ref([{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Bamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5,
}])
</script>

<template>
  <Story title="Base Components/Datatable">
    <KDataTable :value="products" table-style="min-width: 50rem">
      <Column field="code" header="Code" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="quantity" header="Quantity" />
    </KDataTable>
  </Story>
</template>

<style scoped>

</style>
