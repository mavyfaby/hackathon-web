<template>
  <md-dialog :open="store.dialog.editTeam.open" @closed="onClose" scrimClickAction="">
    <div slot="header">Edit team</div>

    <div>
      <md-filled-text-field label="Team name" v-model="name">
        <md-icon slot="leadingicon">groups</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="onEdit">
        Edit Team
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { TYPE } from "vue-toastification";
import makeRequest, { Endpoints } from "~/network/request";
import { useStore } from "~/store";
import showToast from "~/utils/toast";

const store = useStore();
const name = ref("");

const emit = defineEmits(["edit"]);

watch(() => store.dialog.editTeam.open, (val) => {
  if (val) {
    name.value = store.dialog.editTeam.team.name;
    return;
  }
  
  setTimeout(() => {
    name.value = "";
  }, 500);
});

function onClose() {
  store.dialog.editTeam.open = false;
}

function onEdit() {
  makeRequest("PUT", Endpoints.Team + "/" + store.dialog.editTeam.team.id, { name: name.value }, (response) => {
    if (!response.success) {
      showToast(TYPE.ERROR, "Failed to edit team");
      return;
    }

    showToast(TYPE.SUCCESS, "Team edited");
    emit("edit");
    onClose();
  });
}
</script>