<template>
  <div class="container mx-auto px-4 h-full flex justify-center">
    <div class="w-full lg:w-3/4 xl:w-1/2">

      <h4>Teams</h4>
      
      <div v-if="isLoading" class="flex justify-center">
        <md-linear-progress indeterminate />
      </div>

      <div v-else class="bg-surface relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between py-4">
          <md-filled-button @click="store.dialog.team.open = true">
            <md-icon slot="icon">add</md-icon> Add Team
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
                <th scope="col" class="px-4 py-3">Team Name</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(team, i) in teams" :key="i" class="border-b border-outline-variant">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ i + 1 }}
                </th>
                <td class="px-4 py-2">{{ team.name }}</td>
                <td class="px-4 py-2 flex items-center justify-end">
                  <div class="flex justify-center space-x-2 actions">
                    <button @click="onEdit(team)">
                      <md-icon size="4">edit</md-icon>
                    </button>
                    <button @click="onDelete(team)">
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

    <AddTeamDialog @add="getTeams" />
    <EditTeamDialog @edit="getTeams" />
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "~/types";
import { ref, onMounted } from "vue";
import { useStore } from "~/store";

import AddTeamDialog from "~/components/dialogs/teams/AddTeamDialog.vue";
import EditTeamDialog from "~/components/dialogs/teams/EditTeamDialog.vue";
import makeRequest, { Endpoints } from "~/network/request";
import showToast from "~/utils/toast";
import { TYPE } from "vue-toastification";

const isLoading = ref(true);
const teams = ref<Team[]>([]);
const store = useStore();

onMounted(() => {
  getTeams();
});

function getTeams() {
  isLoading.value = true;

  makeRequest("GET", Endpoints.Teams, null, (err, response) => {
    if (err || !response.team) {
      return;
    }

    teams.value = response.team.map((e: any) => {
      return {
        id: e.team_id,
        name: e.team_name,
      };
    });

    isLoading.value = false;
  });
}

function onEdit(team: Team) {
  store.dialog.editTeam.team = team;
  store.dialog.editTeam.open = true;
}

function onDelete(team: Team) {
  store.dialog.main.open({
    title: "Delete team",
    content: `Are you sure you want to delete the team "${team.name}"?`,
    actions: [
      {
        name: "Cancel",
        action: () => store.dialog.main.close(),
      },
      {
        name: "Delete",
        action: () => {

          makeRequest("DELETE", Endpoints.Team, team.id, (err, response) => {
            if (err || !response.success) {
              showToast(TYPE.ERROR, "Failed to delete team");
              return;
            }

            teams.value = teams.value.filter((e) => e.id !== team.id);
            store.dialog.main.close();
            showToast(TYPE.SUCCESS, "Team deleted");
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