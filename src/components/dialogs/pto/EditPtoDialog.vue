<template>
  <md-dialog :open="store.dialog.editPto.open" @closed="onClose" scrimClickAction="">
    <div slot="header">Edit PTO</div>

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
        Edit PTO
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
  store.dialog.editPto.open = false;
}

function select() {
  onClose();
}
</script>