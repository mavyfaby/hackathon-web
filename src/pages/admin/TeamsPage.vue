<template>
  <div class="container mx-auto px-4 h-full flex items-center justify-center">
    <AppBar title="Admin / Teams" />

    <div class="table">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">#</th>
              <th scope="col" class="px-6 py-3">Team Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team, i) in values.teams" :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ i + 1 }}</td>
              <td class="px-6 py-4">{{ team }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppBar from '../../components/appbar/AppBar.vue';
import { values } from "../../values";
</script>

<style lang="scss" scoped>
.table {
  @apply w-1/2 border border-slate-300;
}
</style>