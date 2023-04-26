<template>
  <div class="container mx-auto px-4 h-full flex justify-center">
    <div class="w-full lg:w-3/4 xl:w-1/2">

      <h4>Users</h4>

      <div class="bg-surface relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between py-4">
          <md-filled-button @click="store.dialog.user.open = true">
            <md-icon slot="icon">add</md-icon> Add User
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
                <th scope="col" class="px-4 py-3">Name</th>
                <th scope="col" class="px-4 py-3">Type</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, i) in users" :key="i" class="border-b border-outline-variant">
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
              </tr>                    
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <AddUserDialog />
    <EditUserDialog />
  </div>
</template>

<script lang="ts" setup>
import { users } from "~/values";
import { useStore } from "~/store";

import AddUserDialog from "~/components/dialogs/users/AddUserDialog.vue";
import EditUserDialog from "~/components/dialogs/users/EditUserDialog.vue";

const store = useStore();

function onEdit(name: any) {
  store.dialog.editUser.open = true;
}

function onDelete(name: any) {
  store.dialog.main.open({
    title: "Delete user",
    content: `Are you sure you want to delete the user "${name}"?`,
    actions: [
      {
        name: "Cancel",
        action: () => store.dialog.main.close(),
      },
      {
        name: "Delete",
        action: () => {
          store.dialog.main.close();
          store.dialog.main.open({
            title: "Deleted user",
            content: `The user "${name}" has been deleted.`,
            actions: [
              {
                name: "Close",
                action: () => store.dialog.main.close(),
              },
            ],
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