<template>
  <div class="container mx-auto px-4 h-full flex items-center">
    <AppBar title="Admin Page" />

    <div class="list-container">
      <div class="list-outer">
        <div class="list">
          <FeatureItem
            v-for="(feature, i) in admin.features"
            :name="feature.name"
            :path="feature.path"
            :key="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from '../../components/appbar/AppBar.vue';
import FeatureItem from '../../components/FeatureItem.vue';
import { admin } from "../../values"; 

</script>

<style lang="scss" scoped>
.list {
  @apply flex justify-center flex-col items-center h-full;
}

.list-container {
  @apply flex w-full justify-center border-slate-600;
}

.list-outer {
  @apply flex flex-col border border-slate-300 rounded-xl w-full lg:w-1/2 bg-slate-50;
}
</style>
