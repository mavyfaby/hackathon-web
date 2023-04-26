<template>
  <div class="container mx-auto h-full relative">
    <div class="flex flex-col justify-center items-center h-full gap-5">
      <img :src="store.dark ? DarkLogo : LightLogo" />
      <h3>Employee Tracker</h3>
      <h5>Effortlessly manage your team's productivity and performance.</h5>
      <md-filled-button @click="login">Get started</md-filled-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from '~/store';

import LightLogo from "~/assets/logo/logo.svg?url";
import DarkLogo from "~/assets/logo/logo-dark.svg?url";

const router = useRouter();
const store = useStore();

function login() {
  router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
img {
  @apply w-24;
}

h3 {
  @apply text-4xl font-bold text-primary text-center;
}

h5 {
  @apply font-medium text-on-surface-variant text-center;
}
</style>