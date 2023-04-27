<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <VCard :loading="isLoading" class="mt-16 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3">
        <h3 class="title">Login</h3>
        <div class="flex flex-col">
          <!-- Email -->
          <md-filled-text-field
            v-model="email"
            class="mt-4"
            label="Email"
            @keydown.enter="login"
            :disabled="isDisabled"
            placeholder="Enter email"
          >
            <md-icon slot="leadingicon">email</md-icon>
          </md-filled-text-field> 

          <!-- Password -->
          <md-filled-text-field
            v-model="pass"
            class="mt-4"
            type="password"
            @keydown.enter="login"
            label="Password"
            :disabled="isDisabled"
            placeholder="Enter password"
          >
            <md-icon slot="leadingicon">lock</md-icon>
          </md-filled-text-field>

          <!-- Login Button -->
          <div class="flex items-center justify-end">
            <md-filled-button @click="login" class="mt-8" :disabled="isDisabled">
              <md-icon slot="icon" v-if="!isDisabled">login</md-icon> {{ loginLabel }}
            </md-filled-button>
          </div>
        </div>
      </VCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "~/store";

import VCard from "~/components/VCard.vue";
import showToast from "~/utils/toast";
import { TYPE } from "vue-toastification";
import makeRequest, { Endpoints } from "~/network/request";

const email = ref("");
const pass = ref("");
const isDisabled = ref(false);
const isLoading = ref(false);
const loginLabel = ref("Login");

const router = useRouter();

function login() {
  if (!email.value || !pass.value) {
    showToast(TYPE.ERROR, "Please fill all fields");
    return;
  }

  isLoading.value = true;

  makeRequest("POST", Endpoints.Login, {
    email: email.value,
    password: pass.value,
  }, (err, response) => {
    if (err) {
      showToast(TYPE.ERROR, "Something went wrong");
      isLoading.value = false;
      return;
    }

    if (response.error) {
      showToast(TYPE.ERROR, response.error);
      isLoading.value = false;
      return;
    }

    isLoading.value = false;

    const { type, id } = response;

    switch (type) {
      case 1:
        router.push({ name: "Admin" });
        break;
      case 2:
        router.push({ name: "Techlead" });
        break;
      case 3:
        router.push({ name: "Employee" });
        break;
    }
  });
}
</script>

<style lang="scss" scoped>
.title {
  @apply font-bold text-2xl mb-3 text-center;
}
</style>