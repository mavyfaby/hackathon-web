<template>
  <div class="h-full px-4">
    <AppBar />

    <div class="pt-8 h-full">
      <router-view v-slot="{ Component }" class="grow">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setDefaultTheme } from './utils/theme';

import AppBar from './components/appbar/AppBar.vue';

setDefaultTheme();
</script>

<style lang="scss" scoped>

</style>
