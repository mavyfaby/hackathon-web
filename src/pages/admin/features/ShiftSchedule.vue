<template>
  <div class="container mx-auto px-4 h-full flex justify-center">
    <div class="w-full lg:w-3/4 xl:w-1/2">

      <h4>Shift Schedules</h4>

      <div class="bg-surface relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between py-4">
          <md-filled-button @click="store.dialog.shiftSched.open = true">
            <md-icon slot="icon">add</md-icon> Add Shift Schedule
          </md-filled-button>
          <md-filled-text-field label="Search">
            <md-icon slot="leadingicon">search</md-icon>
          </md-filled-text-field>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-on-surface">
            <thead class="text-xs text-gray-700 uppercase bg-surface-variant text-on-surface-variant">
              <tr>
                <th scope="col" class="px-4 py-3">#</th>
                <th scope="col" class="px-4 py-3">From</th>
                <th scope="col" class="px-4 py-3">To</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(shift, i) in schedules" :key="i" class="border-b border-outline-variant">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ i + 1 }}
                </th>
                <td class="px-4 py-2">{{ to12HourTime(shift.fromTime) }}</td>
                <td class="px-4 py-2">{{ to12HourTime(shift.toTime) }}</td>
                <td class="px-4 py-2 flex items-center justify-end">
                  <div class="flex justify-center space-x-2 actions">
                    <button @click="onEdit(shift)">
                      <md-icon>edit</md-icon>
                    </button>
                    <button @click="onDelete(shift)">
                      <md-icon>delete</md-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <AddShiftDialog @add="getSchedules" />
    <EditShiftDialog @edit="getSchedules" />
  </div>
</template>
  
<script lang="ts" setup>
import type { ShiftSchedule } from "~/types";
import { ref, onMounted } from "vue";
import { useStore } from "~/store";

import AddShiftDialog from "~/components/dialogs/shiftsched/AddShiftDialog.vue";
import EditShiftDialog from "~/components/dialogs/shiftsched/EditShiftDialog.vue";

import makeRequest, { Endpoints } from "~/network/request";
import { TYPE } from "vue-toastification";
import { to12HourTime } from "~/utils/string";
import showToast from "~/utils/toast";

const store = useStore();
const isLoading = ref(true);
const schedules = ref<ShiftSchedule[]>([]);

onMounted(() => {
  getSchedules();
});

function getSchedules() {
  isLoading.value = true;

  makeRequest("GET", Endpoints.ShiftScheds, null, (err, response) => {
    if (err || !response.shifts) {
      return;
    }

    schedules.value = response.shifts.map((e: any) => {
      return {
        id: e.id,
        fromTime: e.from_time,
        toTime: e.to_time,
      };
    });

    isLoading.value = false;
  });
}

function onEdit(shift: ShiftSchedule) {
  store.dialog.editShiftSched.open = true;
  store.dialog.editShiftSched.sched = shift;
}

function onDelete(shift: ShiftSchedule) {
  store.dialog.main.open({
    title: "Delete shift schedule",
    content: `Are you sure you want to delete this schedule?`,
    actions: [
      {
        name: "Cancel",
        action: () => store.dialog.main.close(),
      },
      {
        name: "Delete",
        action: () => {

          makeRequest("DELETE", Endpoints.ShiftSched, shift.id, (err, response) => {
            if (err || !response.success) {
              showToast(TYPE.ERROR, "Failed to delete shift schedule!");
              return;
            }

            schedules.value = schedules.value.filter((e) => e.id !== shift.id);
            store.dialog.main.close();
            showToast(TYPE.SUCCESS, "Shift schedule deleted");
          });
        },
      },
    ],
  })
}
</script>
  
<style lang="scss" scoped>
md-menu {
  --_container-color: var(--md-sys-color-inverse-on-surface);
}

.actions {
  --md-icon-size: 20px;

  button {
    @apply hover:bg-surface-variant p-1 h-8 w-8 flex items-center justify-center rounded-full;
  }
}

h4 {
  @apply text-center text-2xl font-bold text-on-surface-variant mb-8;
}
</style>