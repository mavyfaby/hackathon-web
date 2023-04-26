<template>
  <md-dialog :open="store.dialog.shiftSched.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New shift schedule</div>

    <div class="grid gap-y-5 w-full">
      <md-filled-text-field label="From" type="time" v-model="timeFrom" class="w-full">
        <md-icon slot="leadingicon">access_time</md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="To" type="time" v-model="timeTo" class="w-full">
        <md-icon slot="leadingicon">access_time</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Add Shift Schedule
      </md-text-button>
    </div>
  </md-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "~/store";

const store = useStore();
const timeFrom = ref("");
const timeTo = ref("");

function onClose() {
  store.dialog.shiftSched.open = false;
}

function select() {
  store.dialog.shiftSched.open = false;
} 
</script>