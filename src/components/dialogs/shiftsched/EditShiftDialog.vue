<template>
  <md-dialog :open="store.dialog.editShiftSched.open" @closed="onClose" scrimClickAction="">
    <div slot="header">Edit shift schedule</div>

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
      <md-text-button @click="onEdit">
        Edit Shift Schedule
      </md-text-button>
    </div>
  </md-dialog>
</template>
  
<script lang="ts" setup>
import { ref, watch } from "vue";
import { TYPE } from "vue-toastification";
import { Endpoints } from "~/network/endpoints";
import makeRequest from "~/network/request";
import { useStore } from "~/store";
import showToast from "~/utils/toast";

const store = useStore();
const fromTime = ref("");
const toTime = ref("");

const emit = defineEmits(["edit"]);

watch(() => store.dialog.editShiftSched.open, (val) => {
  if (val) {
    fromTime.value = store.dialog.editShiftSched.sched.fromTime;
    toTime.value = store.dialog.editShiftSched.sched.toTime;
    return;
  }
  
  setTimeout(() => {
    fromTime.value = "";
    toTime.value = "";
  }, 500);
});

function onClose() {
  store.dialog.editShiftSched.open = false;
}

function onEdit() {
  makeRequest("PUT", Endpoints.ShiftSched + "/" + store.dialog.editShiftSched.sched.id, { fromTime: fromTime.value, toTime: toTime.value }, (err, response) => {
    if (err || !response.success) {
      showToast(TYPE.ERROR, "Failed to edit shift schedule");
      return;
    }

    showToast(TYPE.SUCCESS, "Shift schedule edited");
    emit("edit");
    onClose();
  });
}
</script>