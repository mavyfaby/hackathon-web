<template>
  <md-dialog :open="store.dialog.pto.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New PTO</div>

    <div>
      <md-filled-text-field label="PTO name" v-model="name">
        <md-icon slot="leadingicon">article</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Add PTO
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "~/store";

const store = useStore();
const name = ref("");

function onClose() {
  store.dialog.pto.open = false;
}

function select() {
  onClose();
}
</script>