<template>
  <div class="absolute top-0 left-0 right-0 flex justify-between items-center py-6">
    <h4>Hackathon</h4>
    <VButton @click="toLogin">Login</VButton>
  </div>
</template>

<script lang="ts" setup>
import VButton from '../button/VButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function toLogin() {
  router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
h4 {
  @apply font-bold text-xl text-slate-600;
}
</style>