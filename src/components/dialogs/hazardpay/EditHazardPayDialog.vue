<template>
  <md-dialog :open="store.dialog.editHazardPay.open" @closed="onClose" scrimClickAction="">
    <div slot="header">Edit hazard pay</div>

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
      <md-text-button @click="onEdit">
        Edit Hazard Pay
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
const name = ref("");
const pay = ref(0);

const emit = defineEmits(["edit"]);

watch(() => store.dialog.editHazardPay.open, (val) => {
  if (val) {
    name.value = store.dialog.editHazardPay.pay.area;
    pay.value = store.dialog.editHazardPay.pay.pay;
    return;
  }
  
  setTimeout(() => {
    name.value = "";
    pay.value = 0;
  }, 500);
});

function onClose() {
  store.dialog.editHazardPay.open = false;
}

function onEdit() {
  makeRequest("PUT", Endpoints.HazardPay + "/" + store.dialog.editHazardPay.pay.id, { area: name.value, pay: pay.value }, (err, response) => {
    if (err || !response.success) {
      showToast(TYPE.ERROR, "Failed to edit hazard pay");
      return;
    }

    showToast(TYPE.SUCCESS, "Hazard pay edited");
    emit("edit");
    onClose();
  });
}
</script>