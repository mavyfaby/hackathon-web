<template>
    <md-dialog :open="store.dialog.department.open" @closed="onClose" scrimClickAction="">
      <div slot="header">New department</div>
  
      <div>
        <md-filled-text-field label="Department name" v-model="name" />
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
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useStore } from "~/store";
  
  const store = useStore();
  const name = ref("");
  
  function onClose() {
    store.dialog.department.open = false;
  }
  
  function select() {
  
  }
  </script>