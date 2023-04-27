<template>
  <div class="container mx-auto">
    <div>
      <h4>Welcome back Tech lead!</h4>

      <div class="grid grid-cols-2 gap-2 text-on-surface-variant w-1/2 mt-8 mb-4 text-sm">
        <p>Department:</p>
        <p>{department}</p>
        <p>Team name:</p>
        <p>{team}</p>
        <p>Lead name:</p>
        <p>{{ data.first_name }} {{ data.last_name }}</p>
      </div>

      <div class="flex justify-end mb-4">
        <md-tonal-button>
          <md-icon slot="icon">save</md-icon>
          Save changes
        </md-tonal-button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-on-surface">
          <thead class="text-xs text-gray-700 uppercase bg-surface-variant text-on-surface-variant">
            <tr>
              <th scope="col" class="px-4 py-3">Employee Name</th>
              <th scope="col" class="px-4 py-3">Shift Schedule</th>
              <th scope="col" class="px-4 py-3">Group / Team</th>
              <th scope="col" class="px-4 py-3">Select Work Type</th>
              <th scope="col" class="px-4 py-3">Select On PTO</th>
              <th scope="col" class="px-4 py-3">Holiday Off</th>
              <th scope="col" class="px-4 py-3">Location</th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(emp, i) in data.employees" :key="i" class="border-b border-outline-variant">
              <td class="px-4 py-2">{{ emp.employee_name }}</td>
              <td class="px-4 py-2">{{ emp.shift_schedule }}</td>
              <td class="px-4 py-2">{{ emp.group }}</td>
              <td class="px-4 py-2">{{ emp.work_type == 0 ? 'Onsite' : 'WFH' }}</td>
              <td class="px-4 py-2">{{ emp.PTO == 0 ? 'Unplanned Leave' : 'Planned Leave' }}</td>
              <td class="px-4 py-2">{{ emp.holiday_off }}</td>
              <td class="px-4 py-2">{{ emp.location == 0 ? 'Outside Cebu' : 'Within Cebu' }}</td>
            </tr>                    
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TYPE } from "vue-toastification";
import makeRequest, { Endpoints } from "~/network/request";
import { useStore } from "~/store";
import { getStore } from "~/utils/storage";
import showToast from "~/utils/toast";

const data = ref({} as any);

onMounted(() => {
  const id = getStore("id");

  makeRequest("GET", Endpoints.TeamLead, id, (err, response) => {
    if (err) {
      showToast(TYPE.ERROR, "Error fetching team lead data");
      return;
    }

    console.log(response);

    data.value = response;
  })
});
</script>

<style lang="scss" scoped>
h4 {
  @apply text-center text-2xl font-bold text-on-surface;
}
</style>
