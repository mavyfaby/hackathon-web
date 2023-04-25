<template>
  <button
    v-wave
    :disabled="disabled || loading"
    :class="{
      'text-button': text,
      'button': !text,
      'loading-button': loading,
      'light': light,
      'surface': surface || loading,
      'outlined': outlined,
      'small': small,
      'footer': footer
    }"
  >
    <Transition v-if="loading" name="slide-fade" mode="out-in">
      <div class="flex justify-center items-center">
        <m-spinner :class="{ 'mr-3': !noLoadingMargin }" /> <slot />
      </div>
    </Transition>
    <div v-else class="flex gap-x-2 justify-center items-center">
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
import MSpinner from "../spinner/MSpinner.vue";

defineProps({
  text: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  },
  surface: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  noLoadingMargin: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  footer: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.button:not(.light) {
  @apply text-white bg-blue-500 hover:bg-blue-600 outline-none font-medium rounded-lg text-sm px-4
    py-2.5 text-center hover:scale-95 transition-transform duration-200 
    disabled:bg-gray-200 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-400
    disabled:cursor-not-allowed disabled:ring-0 disabled:shadow-none dark:disabled:shadow-none whitespace-nowrap;
}

.button.small, .text-button.small {
  @apply !px-2 !py-1.5 !text-xs;
}

.outlined {
  @apply border border-blue-500;
}

.surface {
  @apply dark:!bg-gray-700;  
}

.light {
  @apply text-sm font-medium text-blue-400 px-2 py-1 rounded-md;
}

.text-button {
  @apply text-sm font-medium text-blue-600 dark:text-blue-400 dark:hover:bg-blue-600/25
    disabled:text-gray-500 hover:bg-blue-100 px-3 py-2.5 rounded-md dark:disabled:text-gray-500
    disabled:hover:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent whitespace-nowrap;
}

.text-button.footer {
  @apply !text-blue-400 hover:!bg-blue-600/25;
}
</style>