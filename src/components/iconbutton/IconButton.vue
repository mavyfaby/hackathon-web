<template>
  <div>
    <button class="icon-button">
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.icon-button {
  @apply text-slate-700 text-sm;
}
</style>
