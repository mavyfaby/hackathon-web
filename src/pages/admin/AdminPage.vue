<template>
  <div class="container mx-auto px-4 h-full flex">
    <div class="flex gap-10 flex-col items-center w-full">

      <div class="flex justify-end w-full">
        <md-filled-button @click="toFeatureList">
          <md-icon slot="icon">settings</md-icon>
          Feature list
        </md-filled-button>
      </div>

      <h4>Master Page</h4>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-on-surface">
          <thead class="text-xs text-gray-700 uppercase bg-surface-variant text-on-surface-variant">
            <tr>
              <th scope="col" class="px-4 py-3">Department</th>
              <th scope="col" class="px-4 py-3">Employee Name</th>
              <th scope="col" class="px-4 py-3">Shift Schedule</th>
              <th scope="col" class="px-4 py-3">Group / Team</th>
              <th scope="col" class="px-4 py-3">Work Type</th>
              <th scope="col" class="px-4 py-3">On PTO</th>
              <th scope="col" class="px-4 py-3">Holiday Off</th>
              <th scope="col" class="px-4 py-3">Remarks</th>
              <th scope="col" class="px-4 py-3">Location</th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(user, i) in users" :key="i" class="border-b border-outline-variant">
              <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ i + 1 }}
              </th>
              <td class="px-4 py-2">{{ user.name }}</td>
              <td class="px-4 py-2">{{ user.type }}</td>
              <td class="px-4 py-2 flex items-center justify-end">
                <div class="flex justify-center space-x-2 actions">
                  <button @click="onEdit(user)">
                    <md-icon size="4">edit</md-icon>
                  </button>
                  <button @click="onDelete(user)">
                    <md-icon>delete</md-icon>
                  </button>
                </div>
              </td>
            </tr>                     -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { admin } from "~/values"; 
import router from "~/router";

function view(path: string) {
  router.push({ path });  
}

function toFeatureList() {
  router.push({ name: "Admin Features" });
}
</script>

<style lang="scss" scoped>
h4 {
  @apply text-center text-2xl font-bold text-on-surface-variant;
}
</style>
