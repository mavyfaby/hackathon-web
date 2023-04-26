<template>
  <div class="absolute top-0 left-0 right-0 flex justify-between items-center p-6">
    <div class="flex gap-4">
      <a href="/">
        <img :src="store.dark ? DarkLogo : LightLogo" />
      </a>
      <h4>Title</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store';

import LightLogo from "~/assets/logo/logo.svg?url";
import DarkLogo from "~/assets/logo/logo-dark.svg?url";

const store = useStore();
</script>

<style lang="scss" scoped>
h4 {
  @apply font-bold text-xl text-on-surface;
}

img {
  @apply w-7;
}
</style>