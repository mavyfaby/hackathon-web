<template>
  <md-dialog :open="store.dialog.shiftSched.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New shift schedule</div>

    <div class="grid gap-y-5 w-full">
      <md-filled-text-field label="From" type="time" v-model="fromTime" class="w-full">
        <md-icon slot="leadingicon">access_time</md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="To" type="time" v-model="toTime" class="w-full">
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
import { TYPE } from "vue-toastification";
import { Endpoints } from "~/network/endpoints";
import makeRequest from "~/network/request";
import { useStore } from "~/store";
import showToast from "~/utils/toast";

const store = useStore();
const fromTime = ref("");
const toTime = ref("");

const emit = defineEmits(["add"]);

function onClose() {
  store.dialog.shiftSched.open = false;
}

function select() {
  if (fromTime.value == "" || toTime.value == "") {
    showToast(TYPE.ERROR, "Please fill up all fields");
    return;
  }

  makeRequest("POST", Endpoints.ShiftSched, { fromTime: fromTime.value, toTime: toTime.value }, (err, response) => {
    if (err || !response.success) {
      showToast(TYPE.ERROR, "Failed to add shift schedule");
      return;
    }

    showToast(TYPE.SUCCESS, "Shift schedule added");
    emit("add");
    onClose();
  });
}
</script>