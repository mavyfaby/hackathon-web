<template>
  <div class="h-full px-4">
    <AppBar />

    <div class="h-full" :class="{ 'pt-24': route.name !== 'Landing' }">
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
import { useRoute } from "vue-router";

import AppBar from './components/appbar/AppBar.vue';
import MainDialog from './components/dialogs/MainDialog.vue';
import SearchDialog from './components/dialogs/SearchDialog.vue';
import { getStore } from './utils/storage';
import { useStore } from './store';

const store = useStore();

setDefaultTheme();

const id = getStore("id");

if (id !== null && id !== undefined && id.length > 0) {
  store.isLoggedIn = true;
}

const route = useRoute();
</script>

<style lang="scss" scoped>

</style>
