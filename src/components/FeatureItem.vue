<template>
  <div class="item">
    <div class="flex items-center">
      <p :title="'View ' + name">
        {{ name }}
      </p>
    </div>
    <div class="flex relative">
      <div class="actions">
        <VButton @click="view(path)" text>View</VButton>
      </div>

      <div class="placeholder">
        ...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VButton from './button/VButton.vue';

defineProps({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
})

/**
 * View data based on the path of the feature.
 */
function view(path: string) {
  console.log(path);
}
</script>

<style lang="scss" scoped>
.item {
  @apply flex gap-x-8 justify-between border-slate-300 w-full p-4 hover:bg-slate-100;

  &:hover {
    .actions {
      @apply visible;
    }

    .placeholder {
      @apply invisible;
    }
  }

  &:first-child {
    @apply rounded-tl-xl rounded-tr-xl;
  }

  &:last-child {
    @apply rounded-bl-xl rounded-br-xl;
  }
}

p {
  @apply my-0 py-0 font-medium;
}

.placeholder {
  @apply absolute right-5;
}

.actions {
  @apply invisible flex space-x-5;
}

.item:not(:last-child) {
  @apply border-b;
}
</style>
