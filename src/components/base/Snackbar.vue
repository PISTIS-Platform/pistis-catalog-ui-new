<template>
    <transition name="fade">
      <div v-if="snackbar.message" class="snackbar" :class="snackbar.variant">
        {{ snackbar.message }}
      </div>
    </transition>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  const snackbar = computed(() => store.state.snackbar)

  </script>
  
  <style scoped>
  .snackbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
  }
  .snackbar.success {
    background-color: #4caf50;
  }
  .snackbar.error {
    background-color: #f44336;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  