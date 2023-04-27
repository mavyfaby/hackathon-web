<template>
  <div class="container mx-auto">
    <div>
      <h4>Welcome back {{ data.name }}!</h4>

      <div class="grid grid-cols-2 gap-2 text-on-surface-variant my-10 text-sm">
        <p>Department:</p>
        <p>{{ data.department_name }}</p>
        <p>Team name:</p>
        <p>{{ data.team_name }}</p>
        <p>Lead name:</p>
        <p>{{ data.name }}</p>
        <p>Accumulated Pro-rated Attendance Bonus:</p>
        <p>{{ data.proattendancebonus }}</p>
        <p>Accumulated Pro-rated Hazard Pay:</p>
        <p>{{ data.hazardpay }}</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-on-surface">
          <thead class="text-xs text-gray-700 uppercase bg-surface-variant text-on-surface-variant">
            <tr>
              <th scope="col" class="px-4 py-3">Shift Schedule</th>
              <th scope="col" class="px-4 py-3">Group / Team</th>
              <th scope="col" class="px-4 py-3">Work Type</th>
              <th scope="col" class="px-4 py-3">PTO</th>
              <th scope="col" class="px-4 py-3">Holiday Off</th>
              <th scope="col" class="px-4 py-3">Location</th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-outline-variant">
              <td class="px-4 py-2">{{ data.shift_schedule }}</td>
              <td class="px-4 py-2">{{ data.team_id }}</td>
              <td class="px-4 py-2">{{ data.work_type == 0 ? 'Onsite' : 'WFH' }}</td>
              <td class="px-4 py-2">{{ data.PTO == 0 ? 'Unplanned Leave' : 'Planned Leave' }}</td>
              <td class="px-4 py-2">{{ data.holiday_off }}</td>
              <td class="px-4 py-2">{{ data.location == 0 ? 'Outside Cebu' : 'Within Cebu' }}</td>
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
import { getStore } from "~/utils/storage";
import showToast from "~/utils/toast";

const data = ref({} as any);

onMounted(() => {
  const id = getStore("id");

  makeRequest("GET", Endpoints.Employee, id, (err, response) => {
    if (err) {
      showToast(TYPE.ERROR, "Error fetching team lead data");
      return;
    }

    

    data.value = response.employee;

    console.log(data.value);
  })
});
</script>

<style lang="scss" scoped>
h4 {
  @apply text-center text-2xl font-bold text-on-surface;
}
</style>
