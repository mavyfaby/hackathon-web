<template>
  <md-dialog :open="store.dialog.search.isOpen" @closed="onClose" scrimClickAction="">
    <div slot="header">{{ store.dialog.search.title }}</div>

    <div class="flex flex-col h-[300px]">
      <md-filled-text-field v-model.trim="searchText" label="Search">
        <md-icon slot="leadingicon">search</md-icon>
      </md-filled-text-field>

      <p v-if="searchText.length > 0 && data.length === 0" class="text-center pt-4">
        No results found.
      </p>

      <div v-else class="mt-5">
        <md-list class="rounded-xl overflow-scroll" >
          <md-list-item
            v-for="(item, i) in data"
            :key="i"
            :headline="item"
            @click="onSelect(item)"
          />
        </md-list>
      </div>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Close
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useStore } from "~/store";

const store = useStore();
const data = ref(<any>[]);
const searchText = ref("");

watch(() => store.dialog.search.data, val => {
  data.value = val;
});

watch(searchText, val => {
  if (val.length > 0) {
    data.value = store.dialog.search.data.filter((item: any) => item.toLowerCase().includes(val.toLowerCase()));
  } else {
    data.value = store.dialog.search.data;
  }
})

function onClose() {
  store.dialog.search.isOpen = false;
  store.dialog.search.data = [];
  data.value = [];
}

function onSelect(item: any) {
  store.dialog.search.callback(item);
  onClose();
}
</script>

<style lang="scss" scoped>
md-list {
  --md-list-container-color: var(--md-sys-color-surface-variant);
  --md-list-item-list-item-container-color: var(--md-sys-color-surface-variant);
}
</style>