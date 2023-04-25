<template>
  <div class="container mx-auto h-full relative">
    <AppBar title="Hackathon" />

    <div class="flex flex-col justify-center items-center h-full">
      <h3>Employee Tracker</h3>
      <h5>Effortlessly manage your team's productivity and performance.</h5>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppBar from '../../components/appbar/HomeAppBar.vue';
</script>

<style lang="scss" scoped>
h3 {
  @apply text-4xl font-bold mb-4 text-slate-800 text-center;
}

h5 {
  @apply text-xl font-medium text-slate-600 text-center;
}
</style>