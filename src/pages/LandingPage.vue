<template>
  <div class="container mx-auto h-full relative">
    <div class="flex flex-col justify-center items-center h-full gap-5">
      <h3>Employee Tracker</h3>
      <h5>Effortlessly manage your team's productivity and performance.</h5>
      <md-filled-button @click="login">Get started</md-filled-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function login() {
  router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
h3 {
  @apply text-4xl font-bold text-primary text-center;
}

h5 {
  @apply font-medium text-on-surface-variant text-center;
}
</style>