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
        <p>{lead}</p>
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
            <!-- <tr v-for="(user, i) in users" :key="i" class="border-b border-outline-variant">
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
            </tr>                     -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
h4 {
  @apply text-center text-2xl font-bold text-on-surface;
}
</style>
