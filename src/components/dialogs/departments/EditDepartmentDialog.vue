<template>
  <md-dialog :open="store.dialog.editDepartment.open" @closed="onClose" scrimClickAction="">
    <div slot="header">Edit department</div>

    <div>
      <md-filled-text-field label="Department name" v-model="name">
        <md-icon slot="leadingicon">account_tree</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="onEdit">
        Edit department
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

const emit = defineEmits(["edit"]);

watch(() => store.dialog.editDepartment.open, (val) => {
  if (val) {
    name.value = store.dialog.editDepartment.dept.name;
    return;
  }
  
  setTimeout(() => {
    name.value = "";
  }, 500);
});

function onClose() {
  store.dialog.editDepartment.open = false;
}

function onEdit() {
  makeRequest("PUT", Endpoints.Department + "/" + store.dialog.editDepartment.dept.id, { name: name.value }, (err, response) => {
    if (err || !response.success) {
      showToast(TYPE.ERROR, "Failed to edit department");
      return;
    }

    showToast(TYPE.SUCCESS, "Department edited");
    emit("edit");
    onClose();
  });
}
</script>