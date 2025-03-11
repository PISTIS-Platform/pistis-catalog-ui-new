<script>
import AuthRegister from '@/components/auth/AuthRegister.vue'

export default {
  name: 'RegistrationView',
  components: { AuthRegister },
}
</script>

<template>
  <div class="auth-content">
    <AuthRegister />
  </div>
</template>

<style scoped>
.auth-content {
  height: 100dvh;
  width: 100dvw;
  background: url('/src/assets/images/auth-background.png') lightgray 50% / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
