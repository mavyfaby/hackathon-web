import { defineStore } from "pinia";

/**
 * Global store
 */
const useStore = defineStore("global", () => {
  const dark: boolean = false;

  return {
    dark
  };
});

export {
  useStore
};