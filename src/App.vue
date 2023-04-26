<template>
  <div class="h-full px-4">
    <AppBar />

    <div class="pt-24 h-full">
      <router-view v-slot="{ Component }" class="grow">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>

    <MainDialog />
    <SearchDialog />
  </div>
</template>

<script setup lang="ts">
import { setDefaultTheme } from './utils/theme';

import AppBar from './components/appbar/AppBar.vue';
import MainDialog from './components/dialogs/MainDialog.vue';
import SearchDialog from './components/dialogs/SearchDialog.vue';

setDefaultTheme();
</script>

<style lang="scss" scoped>

</style>
