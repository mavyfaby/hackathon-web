<template>
  <div class="container mx-auto px-4 h-full flex">
    <div class="flex gap-10 flex-col items-center w-full h-full">
      <h4>Admin Feature List</h4>
      <md-list class="w-3/4 border border-outline-variant rounded-xl">
        <md-list-item
          v-for="(feature, i) in admin.features"
          :key="i"
          :headline="feature"
          @click="view(feature)"
          trailingSupportingText="Select"
        />
      </md-list>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { admin } from "~/values";
import router from "~/router";

function view(name: string) {
  router.push({ name });
}
</script>
  
<style lang="scss" scoped>
h4 {
  @apply text-center text-2xl font-bold text-on-surface-variant;
}
</style>
  