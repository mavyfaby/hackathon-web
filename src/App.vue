<template>
  <div class="h-full px-4">
    <router-view v-slot="{ Component }" class="grow">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>
