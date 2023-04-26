<template>
  <div class="container mx-auto px-4 h-full flex justify-center">
    <div class="w-full lg:w-3/4 xl:w-1/2">

      <h4>Hazard Pay Information</h4>

      <div class="bg-surface relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between py-4">
          <md-filled-button @click="store.dialog.hazardPay.open = true">
            <md-icon slot="icon">add</md-icon> Add Hazard Pay
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
                <th scope="col" class="px-4 py-3">Area</th>
                <th scope="col" class="px-4 py-3">Hazard Pay</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hazard, i) in hazardPayInfo" :key="i" class="border-b border-outline-variant">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ i + 1 }}
                </th>
                <td class="px-4 py-2">{{ hazard.area }}</td>
                <td class="px-4 py-2">{{ toCurrency(Number(hazard.rate)) }}</td>
                <td class="px-4 py-2 flex items-center justify-end">
                  <div class="flex justify-center space-x-2 actions">
                    <button @click="onEdit(hazard)">
                      <md-icon>edit</md-icon>
                    </button>
                    <button @click="onDelete(hazard)">
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

    <AddHazardPayDialog />
    <EditHazardPayDialog />
  </div>
</template>
  
<script lang="ts" setup>
import { hazardPayInfo } from "~/values";
import { useStore } from "~/store";
import { toCurrency } from "~/utils/string";

import AddHazardPayDialog from "~/components/dialogs/hazardpay/AddHazardPayDialog.vue";
import EditHazardPayDialog from "~/components/dialogs/hazardpay/EditHazardPayDialog.vue";

const store = useStore();

function onEdit(name: any) {
  store.dialog.editHazardPay.open = true;
}

function onDelete(name: any) {
  store.dialog.main.open({
    title: "Delete hazard pay",
    content: `Are you sure you want to delete area "${name}"?`,
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
            title: "Deleted hazard pay",
            content: `The area "${name}" has been deleted.`,
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