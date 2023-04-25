<template>
  <div class="absolute top-0 left-0 right-0 flex justify-between items-center p-6">
    <h4>{{ title }}</h4>
    <VButton @click="toLogout">Logout</VButton>
  </div>
</template>

<script lang="ts" setup>
import VButton from '../button/VButton.vue';
// import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    required: true
  }
})

// const router = useRouter();

function toLogout() {
  // TODO: logout
}
</script>

<style lang="scss" scoped>
h4 {
  @apply font-bold text-xl text-slate-600;
}
</style>