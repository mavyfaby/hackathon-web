<template>
  <md-dialog :open="store.dialog.editUser.open" @closed="onClose" scrimClickAction="">
    <div slot="header">Edit user</div>

    <div class="flex flex-col" :class="{ 'gap-5': type !== Users.EMPLOYEE }">
      <div class="grid gap-5 w-full" v-if="type == Users.TECH_LEAD">
        <div class="w-full">
          <md-filled-text-field label="Lead Name" v-model="leadName" class="w-full">
            <md-icon slot="leadingicon">person</md-icon>
          </md-filled-text-field>
        </div>
        
        <div class="grid grid-cols-2 gap-5">
          <md-filled-text-field ref="teamAnchor" label="Team Name" v-model="teamName" @click="searchOpen('team')" readOnly>
            <md-icon slot="leadingicon">groups</md-icon>
          </md-filled-text-field>
          <md-filled-text-field ref="deptAnchor" label="Department" v-model="deptName" @click="searchOpen('dept')" readOnly>
            <md-icon slot="leadingicon">account_tree</md-icon>
          </md-filled-text-field>
        </div>
      </div>

      <div v-if="type == Users.EMPLOYEE">
        <Transition name="fade" mode="out-in">
          <div class="grid gap-5" v-if="step === 1">
            <!-- Name -->
            <div class="grid grid-cols-3 gap-5">
              <md-filled-text-field label="First name" v-model="firstName">
                <md-icon slot="leadingicon">person</md-icon>
              </md-filled-text-field>
              <md-filled-text-field label="Middle name" v-model="middleName">
                <md-icon slot="leadingicon">person</md-icon>
              </md-filled-text-field>
              <md-filled-text-field label="Last name" v-model="lastName">
                <md-icon slot="leadingicon">person</md-icon>
              </md-filled-text-field>
            </div>
    
            <!-- Email and Phone -->
            <div class="grid grid-cols-2 gap-5">
              <md-filled-text-field type="email" label="Email" v-model="email">
                <md-icon slot="leadingicon">email</md-icon>
              </md-filled-text-field>
              <md-filled-text-field type="tel" label="Mobile number" v-model="phone">
                <md-icon slot="leadingicon">phone</md-icon>
              </md-filled-text-field>
            </div>
            
            <!-- Birthdate and Gender -->
            <div class="grid grid-cols-2 gap-5">
              <md-filled-text-field type="date" label="Birthdate" v-model="birthdate">
                <md-icon slot="leadingicon">date_range</md-icon>
              </md-filled-text-field>
              <md-filled-text-field type="gender" maxlength="1" label="Gender" placeholder="Enter M or F" v-model="gender">
                <md-icon slot="leadingicon">male</md-icon>
              </md-filled-text-field>
            </div>
            

            <div class="flex justify-center">
              <md-tonal-button @click="step = 2">
                <md-icon slot="icon">arrow_forward</md-icon>
                Next step
              </md-tonal-button>
            </div>
          </div>
  
          <div class="grid gap-5" v-else>
            <!-- Address -->
            <div class="flex">
              <md-filled-text-field label="Address" class="w-full" v-model="address">
                <md-icon slot="leadingicon">location_on</md-icon>
              </md-filled-text-field>
            </div>

            <!-- Designation and Status -->
            <div class="grid grid-cols-2 gap-5">
              <md-filled-text-field label="Designation" v-model="designation" @click="searchOpen('designation')">
                <md-icon slot="leadingicon">work</md-icon>
              </md-filled-text-field>
              <md-filled-text-field label="Status" v-model="status">
                <md-icon slot="leadingicon">check_circle</md-icon>
              </md-filled-text-field>
            </div>

            <!-- Username and Password -->
            <div class="grid grid-cols-2 gap-5">
              <md-filled-text-field label="Username" v-model="username">
                <md-icon slot="leadingicon">person</md-icon>
              </md-filled-text-field>
              <md-filled-text-field type="password" label="Password" v-model="password">
                <md-icon slot="leadingicon">lock</md-icon>
              </md-filled-text-field>
            </div>
  
            <div class="flex justify-center">
              <md-tonal-button @click="step = 1">
                <md-icon slot="icon">arrow_back</md-icon>
                Previous step
              </md-tonal-button>
            </div>
          </div>
        </Transition>
      </div>

      <div v-if="type != Users.EMPLOYEE" class="grid grid-cols-2 gap-5">
        <md-filled-text-field label="Username" v-model="username">
          <md-icon slot="leadingicon">person</md-icon>
        </md-filled-text-field>
        <md-filled-text-field type="password" label="Password" v-model="password">
          <md-icon slot="leadingicon">lock</md-icon>
        </md-filled-text-field>
      </div>

      <div class="flex flex-col items-center">  
        <p class="text-base my-4">Select user type:</p>

        <div class="flex">
          <div class="type-select flex items-center" @click="onSelectType(Users.ADMIN)">
            <md-radio :checked="type == Users.ADMIN" name="type" id="admin-type" />
            <label for="admin-type">Admin</label>
          </div>
          <div class="type-select flex items-center" @click="onSelectType(Users.TECH_LEAD)">
            <md-radio :checked="type == Users.TECH_LEAD" name="type" id="techlead-type" />
            <label for="techlead-type">Tech Lead</label>
          </div>
          <div class="type-select flex items-center" @click="onSelectType(Users.EMPLOYEE)">
            <md-radio :checked="type == Users.EMPLOYEE" name="type" id="employee-type" />
            <label for="employee-type">Employee</label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Add User
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "~/store";

import { Users } from "~/types";

const store = useStore();
const type = ref(Users.ADMIN);
const step = ref(1);

// Tech name
const leadName = ref("");
const teamName = ref("");
const deptName = ref("");

// Employee
const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const email = ref("");
const birthdate = ref("");
const gender = ref("");
const address = ref("");
const phone = ref("");
const designation = ref("");
const status = ref("");

// GLobal
const username = ref("");
const password = ref("");

function searchOpen(type: string) {
  // store.dialog.search.open({
  //   data: ['designation', 'team'].includes(type) ? teams : departments,
  //   title: "Select a " + (type === 'team' ? 'team' : 'department'),
  //   nameKey: 'name',
  //   valueKey: 'id',
  //   callback: (value: string) => {
  //     if (type === 'team') {
  //       return teamName.value = value;
  //     }

  //     if (type === 'designation') {
  //       return designation.value = value;
  //     }

  //     return deptName.value = value;
  //   }
  // })
}

function onSelectType(t: Users) {
  type.value = t;
}

function onClose() {
  store.dialog.editUser.open = false;
}

function select() {

}
</script>

<style lang="scss" scoped>
md-menu {
  --_container-color: var(--md-sys-color-inverse-on-surface);
}
  
.type-select {
  @apply cursor-pointer;
}
</style>