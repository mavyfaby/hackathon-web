<template>
  <div class="container mx-auto h-full relative">
    <AppBar title="Hackathon">
      <template #actions>
        <md-filled-button @click="login">Login</md-filled-button>
      </template>
    </AppBar>

    <div class="flex flex-col justify-center items-center h-full gap-5">
      <h3>Employee Tracker</h3>
      <h5>Effortlessly manage your team's productivity and performance.</h5>
      <md-filled-button @click="login">Get started</md-filled-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import AppBar from '~/components/appbar/AppBar.vue';

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