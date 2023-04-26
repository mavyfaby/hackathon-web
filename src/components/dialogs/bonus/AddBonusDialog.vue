<template>
  <md-dialog :open="store.dialog.bonus.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New Attendance Bonus</div>

    <div>
      <md-filled-text-field type="number" label="Bonus per month" v-model="bonus">
        <md-icon slot="leadingicon">insights</md-icon>
      </md-filled-text-field>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Add bonus
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "~/store";

const store = useStore();
const bonus = ref("");

function onClose() {
  store.dialog.bonus.open = false;
}

function select() {
  onClose();
}
</script>