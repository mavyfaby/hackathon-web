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

      <div class="flex justify-center" v-if="isLoading">
        <md-linear-progress indeterminate></md-linear-progress>
      </div>

      <div v-else class="overflow-x-auto">
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
            <tr v-for="(d, i) in data" :key="i" class="border-b border-outline-variant">
              <td class="px-4 py-2">{{ d.department }}</td>
              <td class="px-4 py-2">{{ d.employeeName }}</td>
              <td class="px-4 py-2">{{ d.shift_schedule }}</td>
              <td class="px-4 py-2">{{ d["group/team"] }}</td>
              <td class="px-4 py-2">{{ d.work_type }}</td>
              <td class="px-4 py-2">{{ d.PTO }}</td>
              <td class="px-4 py-2">{{ d.holiday_off == 0 ? 'OFF' : 'ON' }}</td>
              <td class="px-4 py-2">{{ d.remarks }}</td>
              <td class="px-4 py-2">{{ d.location }}</td>
            </tr>                    
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import makeRequest, { Endpoints } from "~/network/request";
import { TYPE } from "vue-toastification";

import { ref, onMounted } from "vue";
import router from "~/router";
import showToast from "~/utils/toast";

const isLoading = ref(true);
const data = ref(<any>[]);

onMounted(() => {
  makeRequest("GET", Endpoints.AdminMasterPage, null, (err, res) => {
    if (err) {
      showToast(TYPE.ERROR, "Failed to fetch master page");
      return;
    }

    for (const d of res[0]) {
      data.value.push(d);
    }

    isLoading.value = false;
  });
});

function toFeatureList() {
  router.push({ name: "Admin Features" });
}
</script>

<style lang="scss" scoped>
h4 {
  @apply text-center text-2xl font-bold text-on-surface-variant;
}
</style>
