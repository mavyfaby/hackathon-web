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
              <!-- <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
              </td> -->
            </tr>                    
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import makeRequest, { Endpoints } from "~/network/request";

import { ref, onMounted } from "vue";
import router from "~/router";

const isLoading = ref(true);
const data = ref(<any>[]);

onMounted(() => {

  makeRequest("GET", Endpoints.Departments, null, (res) => {
    for (const dept of res.department) {
      const d = {};
      const department = dept.department_details;
      const teams = dept.teams;

      if (teams.length > 0) {
        
        for (const team of teams) {
          const employees = team.employees;
          
          for (const emp of employees) {
            const name = `${emp.first_name} ${emp.middle_name} ${emp.last_name}}`;
            const shift = emp.shift_schedule;
            const group = team.team_name;
            const workType = emp.work_type;
            const onPTO = emp.PTO;
            const holidayOff = emp.holiday_off;
            const remarks = emp.remarks;
          }
        }
      }
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
