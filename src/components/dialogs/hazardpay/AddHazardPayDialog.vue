<template>
  <md-dialog :open="store.dialog.hazardPay.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New hazard pay</div>

    <div class="grid gap-5">
      <md-filled-text-field label="Area name" v-model="name">
        <md-icon slot="leadingicon">location_city</md-icon>
      </md-filled-text-field>
      <md-filled-text-field min="0" type="number" label="Hazard Pay" v-model="pay">
        <md-icon slot="leadingicon">insights</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Add Hazard Pay
      </md-text-button>
    </div>
  </md-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "~/store";

const store = useStore();
const name = ref("");
const pay = ref("");

function onClose() {
  store.dialog.hazardPay.open = false;
}

function select() {
  onClose();
}
</script>