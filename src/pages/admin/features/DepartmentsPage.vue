<template>
  <div class="container mx-auto px-4 h-full flex justify-center">
    <div class="w-full lg:w-3/4 xl:w-1/2">

      <h4>Departments</h4>

      <div v-if="isLoading" class="flex justify-center">
        <md-linear-progress indeterminate />
      </div>

      <div v-else class="bg-surface relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between py-4">
          <md-filled-button @click="store.dialog.department.open = true">
            <md-icon slot="icon">add</md-icon> Add Department
          </md-filled-button>
          <md-filled-text-field label="Search"> 
            <md-icon slot="leadingicon">search</md-icon>
          </md-filled-text-field>
        </div>
        <div class="overflow-x-auto pb-10">
          <table class="w-full text-sm text-left text-on-surface">
            <thead class="text-xs text-gray-700 uppercase bg-surface-variant text-on-surface-variant">
              <tr>
                <th scope="col" class="px-4 py-3">#</th>
                <th scope="col" class="px-4 py-3">Department Name</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dept, i) in departments" :key="i" class="border-b border-outline-variant">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ i + 1 }}
                </th>
                <td class="px-4 py-2">{{ dept.name }}</td>
                <td class="px-4 py-2 flex items-center justify-end">
                  <div class="flex justify-center space-x-2 actions">
                    <button @click="onEdit(dept)">
                      <md-icon>edit</md-icon>
                    </button>
                    <button @click="onDelete(dept)">
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

    <AddDepartmentDialog @add="getDepartments" />
    <EditDepartmentDialog @edit="getDepartments" />
  </div>
</template>

<script lang="ts" setup>
import type { Department } from "~/types";
import { useStore } from "~/store";
import { ref, onMounted } from "vue";

import AddDepartmentDialog from "~/components/dialogs/departments/AddDepartmentDialog.vue";
import EditDepartmentDialog from "~/components/dialogs/departments/EditDepartmentDialog.vue";
import makeRequest, { Endpoints } from "~/network/request";
import { TYPE } from "vue-toastification";
import showToast from "~/utils/toast";
import { teams } from "~/values";

const store = useStore();
const departments = ref<Department[]>([]);
const isLoading = ref(true);

onMounted(() => {
  getDepartments();
});

function getDepartments() {
  isLoading.value = true;
  
  makeRequest("GET", Endpoints.Departments, null, (response) => {
    if (!response.depts) {
      return;
    }
  
    departments.value = response.depts.map((e: any) => {
      return {
        id: e.department_id,
        name: e.department_name,
      };
    });
  
    isLoading.value = false;
  });
}

function onEdit(dept: Department) {
  store.dialog.editDepartment.open = true;
  store.dialog.editDepartment.dept = dept;
}

function onDelete(dept: Department) {
  store.dialog.main.open({
    title: "Delete department",
    content: `Are you sure you want to delete the department "${dept.name}"?`,
    actions: [
      {
        name: "Cancel",
        action: () => store.dialog.main.close(),
      },
      {
        name: "Delete",
        action: () => {
          makeRequest("DELETE", Endpoints.Department, dept.id, (response) => {
            if (!response.success) {
              showToast(TYPE.ERROR, "Failed to delete department");
              return;
            }

            departments.value = departments.value.filter((e) => e.id !== dept.id);
            store.dialog.main.close();
            showToast(TYPE.SUCCESS, "Department deleted");
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