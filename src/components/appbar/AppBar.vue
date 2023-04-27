<template>
  <div class="absolute top-0 left-0 right-0 flex justify-between items-center p-6">
    <div class="flex  gap-4">
      <a href="/">
        <img :src="store.dark ? DarkLogo : LightLogo" />
      </a>
      <h4>{{ store.appbarTitle }}</h4>
    </div>

    <div class="flex items-center gap-5">
      <md-outlined-button v-if="store.isLoggedIn" @click="logout">
        Logout
      </md-outlined-button>
      <md-switch @click="changeTheme" :selected="isDarkMode()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store';
import { setDefaultTheme, isDarkMode } from "~/utils/theme";

import LightLogo from "~/assets/logo/logo.svg?url";
import DarkLogo from "~/assets/logo/logo-dark.svg?url";
import { removeStore } from '~/utils/storage';
import router from '~/router';

const store = useStore();

function logout() {
  removeStore("id");
  router.push({ name: 'Login' });
  store.isLoggedIn = false;
}

function changeTheme(ev: any) {
  setDefaultTheme(ev.target.button.ariaChecked === "true");
}
</script>

<style lang="scss" scoped>
h4 {
  @apply font-bold text-lg text-on-surface-variant;
}

img {
  @apply w-7;
}
</style>
