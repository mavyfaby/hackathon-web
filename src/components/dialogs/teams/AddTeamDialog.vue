<template>
  <md-dialog :open="store.dialog.team.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New team</div>

    <div>
      <md-filled-text-field label="Team name" v-model.trim="name">
        <md-icon slot="leadingicon">groups</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Add Team
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import makeRequest, { Endpoints } from "~/network/request";
import { TYPE } from "vue-toastification";
import { useStore } from "~/store";
import showToast from "~/utils/toast";

const store = useStore();
const name = ref("");

const emit = defineEmits(["add"]);

function onClose() {
  store.dialog.team.open = false;
}

function select() {
  if (name.value == "") {
    return;
  }

  makeRequest("POST", Endpoints.Team, { name: name.value }, (err, response) => {
    if (err || !response.success) {
      showToast(TYPE.ERROR, "Failed to add team");
      return;
    }

    showToast(TYPE.SUCCESS, "Team added");
    emit("add");
    onClose();
  });
}
</script>