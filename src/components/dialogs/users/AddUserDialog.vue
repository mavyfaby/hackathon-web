<template>
  <md-dialog :open="store.dialog.user.open" @closed="onClose" scrimClickAction="">
    <div slot="header">New {{ type === Users.ADMIN ? 'Admin' : type === Users.TECH_LEAD ? 'Tech Lead' : 'Employee' }}</div>

    <div class="flex flex-col" :class="{ 'gap-5': type !== Users.EMPLOYEE }">
      <div class="grid gap-5 w-full" v-if="type == Users.TECH_LEAD">
        <div class="w-full">
          <md-filled-text-field label="Lead Name" v-model="leadName" class="w-full">
            <md-icon slot="leadingicon">person</md-icon>
          </md-filled-text-field>
        </div>
        
        <div class="grid grid-cols-2 gap-5">
          <md-filled-text-field ref="teamAnchor" label="Team" v-model="team.name" @click="searchOpen('team')" readOnly>
            <md-icon slot="leadingicon">groups</md-icon>
          </md-filled-text-field>
          <md-filled-text-field ref="deptAnchor" label="Department" v-model="department.name" @click="searchOpen('dept')" readOnly>
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
            <div class="grid grid-cols-2 gap-5">
              <md-filled-text-field label="Address" class="w-full" v-model="address">
                <md-icon slot="leadingicon">location_on</md-icon>
              </md-filled-text-field>
              <md-filled-text-field label="Status" v-model="status">
                <md-icon slot="leadingicon">check_circle</md-icon>
              </md-filled-text-field>
            </div>

            <!-- Designation and Status -->
            <div class="grid grid-cols-2 gap-5">
              <md-filled-text-field label="Team Designation" v-model="team.name" @click="searchOpen('team')" readOnly>
                <md-icon slot="leadingicon">work</md-icon>
              </md-filled-text-field>
              <md-filled-text-field ref="deptAnchor" label="Department" v-model="department.name" @click="searchOpen('dept')" readOnly>
                <md-icon slot="leadingicon">account_tree</md-icon>
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
      <md-text-button @click="addUser">
        Add User
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { Console } from "console";
import { ref } from "vue";
import { TYPE } from "vue-toastification";
import { Endpoints } from "~/network/endpoints";
import makeRequest from "~/network/request";
import { useStore } from "~/store";

import { Users } from "~/types";
import showToast from "~/utils/toast";

const store = useStore();
const type = ref(Users.ADMIN);
const step = ref(1);

// Tech name
const leadName = ref("");
const team = ref({ id: -1, name: "" });
const department= ref({ id: -1, name: "" });

// Employee
const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const email = ref("");
const birthdate = ref("");
const gender = ref("");
const address = ref("");
const phone = ref("");
const status = ref("active");

// GLobal
const username = ref("");
const password = ref("");

function searchOpen(type: string) {
  makeRequest("GET", type === "team" ? Endpoints.Teams : Endpoints.Departments, null, (err, response) => {
    if (err) {
      showToast(TYPE.ERROR, "Failed to fetch " + (type === 'team' ? 'teams' : 'departments'));
      return;
    }

    if ((type === "team" && !response.team) || (type === "dept" && !response.depts)) {
      return;
    }

    const data = response[type === 'team' ? 'team' : 'depts'].map((e: any) => {
      return {
        id: type === 'team' ? e.team_id : e.department_id,
        name: type === 'team' ? e.team_name : e.department_name,
      };
    });

    store.dialog.search.open({
      data: data,
      title: "Select a " + (type === 'team' ? 'team' : 'department'),
      nameKey: 'name',
      valueKey: 'id',
      callback: (value: { id: number, name: string }) => {
        if (type === 'team') {
          return team.value = value;;
        }

        return department.value = value;
      }
    })
  });
}

function onSelectType(t: Users) {
  type.value = t;
}

function onClose() {
  store.dialog.user.open = false;
}

function addUser() {
  switch (type.value) {
    case Users.ADMIN:

      const dataAdmin: any = {
        username: username.value,
        password: password.value,
      };

      // If any of the data is empty
      for (const key in dataAdmin) {
        if (dataAdmin[key] === "") {
          showToast(TYPE.ERROR, "Please fill up all fields");
          return;
        }
      }

      makeRequest("POST", Endpoints.Admin, dataAdmin, (err, response) => {
        if (err) {
          showToast(TYPE.ERROR, "Error adding admin");
          return;
        }

        showToast(TYPE.SUCCESS, "Successfully added admin");
        onClose();
      });

      break;
    case Users.TECH_LEAD:
      break;
    case Users.EMPLOYEE:

      const data: any = {
        last_name: lastName.value,
        first_name: firstName.value,
        middle_name: middleName.value,
        email: email.value,
        birth_date: birthdate.value,
        gender: gender.value,
        address: address.value,
        mobile_number: phone.value,
        password: password.value,
        status: status.value,
        team_id: team.value.id,
        dept_id: department.value.id,
      };

      // If any of the data is empty
      for (const key in data) {
        if (data[key] === "" || data[key] === -1) {
          showToast(TYPE.ERROR, "Please fill up all fields");
          return;
        }
      }

      makeRequest("POST", Endpoints.Employee, data, (err, response) => {
        if (err) {
          showToast(TYPE.ERROR, "Error adding employee");
          return;
        }

        // Clear all fields
        firstName.value = "";
        lastName.value = "";
        middleName.value = "";  
        email.value = "";
        birthdate.value = "";
        gender.value = "";
        address.value = "";
        phone.value = "";
        status.value = "active";
        team.value = { id: -1, name: "" };
        department.value = { id: -1, name: "" };

        // Show message
        showToast(TYPE.SUCCESS, "Successfully added employee");

        // Close dialog
        onClose();
      });

      break;
  }
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