<template>
  <div class="item">
    <div class="flex items-center">
      <p :title="'View ' + name">
        {{ name }}
      </p>
    </div>
    <div class="flex relative">
      <div class="actions">
        <md-filled-button @click="view(path)" text>View</md-filled-button>
      </div>

      <div class="placeholder">
        ...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../router';

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
  router.push({ path });
}
</script>

<style lang="scss" scoped>
.item {
  @apply flex gap-x-8 justify-between border-slate-300 w-full px-4 py-2 hover:bg-slate-100;

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
  @apply my-0 py-0 font-medium text-slate-700 text-sm;
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
