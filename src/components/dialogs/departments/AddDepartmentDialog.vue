<template>
  <md-dialog :open="store.dialog.department.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New department</div>

    <div>
      <md-filled-text-field label="Department name" v-model="name">
        <md-icon slot="leadingicon">account_tree</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Add department
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
const name = ref("");

const emit = defineEmits(["add"]);

function onClose() {
  store.dialog.department.open = false;
}

function select() {
  if (name.value == "") {
    return;
  }

  makeRequest("POST", Endpoints.Department, { name: name.value }, (err, response) => {
    if (err || !response.success) {
      showToast(TYPE.ERROR, "Failed to add department");
      return;
    }

    showToast(TYPE.SUCCESS, "Team department");
    emit("add");
    onClose();
  });
}
</script>