<script>
import AuthLogin from '@/components/auth/AuthLogin.vue'

export default {
  name: 'AuthView',
  components: { AuthLogin },
}
</script>

<template>
  <div class="auth-content">
    <AuthLogin />
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
