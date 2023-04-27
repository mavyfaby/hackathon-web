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
              <tr v-for="(hazard, i) in hazardPays" :key="i" class="border-b border-outline-variant">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ i + 1 }}
                </th>
                <td class="px-4 py-2">{{ hazard.area }}</td>
                <td class="px-4 py-2">{{ toCurrency(Number(hazard.pay)) }}</td>
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

    <AddHazardPayDialog @add="getHazardPays" />
    <EditHazardPayDialog @edit="getHazardPays" />
  </div>
</template>
  
<script lang="ts" setup>
import type { HazardPay } from "~/types";
import { useStore } from "~/store";
import { toCurrency } from "~/utils/string";

import AddHazardPayDialog from "~/components/dialogs/hazardpay/AddHazardPayDialog.vue";
import EditHazardPayDialog from "~/components/dialogs/hazardpay/EditHazardPayDialog.vue";
import { ref, onMounted } from "vue";
import { Endpoints } from "~/network/endpoints";
import makeRequest from "~/network/request";
import { TYPE } from "vue-toastification";
import showToast from "~/utils/toast";

const store = useStore();
const isLoading = ref(false);
const hazardPays = ref<HazardPay[]>([]);

onMounted(() => {
  getHazardPays();
});

function getHazardPays() {
  isLoading.value = true;

  makeRequest("GET", Endpoints.HazardPays, null, (err, response) => {
    if (err || !response.pays) {
      return;
    }

    hazardPays.value = response.pays.map((e: any) => {
      return {
        id: e.id,
        area: e.area_name,
        pay: e.pay
      };
    });

    isLoading.value = false;
  });
}

function onEdit(pay: HazardPay) {
  store.dialog.editHazardPay.open = true;
  store.dialog.editHazardPay.pay = pay;
}

function onDelete(pay: HazardPay) {
  store.dialog.main.open({
    title: "Delete hazard pay",
    content: `Are you sure you want to delete area "${pay.area}"?`,
    actions: [
      {
        name: "Cancel",
        action: () => store.dialog.main.close(),
      },
      {
        name: "Delete",
        action: () => {

          makeRequest("DELETE", Endpoints.HazardPay, pay.id, (err, response) => {
            if (err || !response.success) {
              showToast(TYPE.ERROR, "Failed to delete hazard pay info!");
              return;
            }

            hazardPays.value = hazardPays.value.filter((e) => e.id !== pay.id);
            store.dialog.main.close();
            showToast(TYPE.SUCCESS, "Hazard Pay deleted");
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