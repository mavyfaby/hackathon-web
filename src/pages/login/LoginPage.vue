<template>
  <div class="container mx-auto">
    <template>
      <div class="flex justify-center">
        <VCard :loading="isLoading" class="mt-16 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3">
          <h3 class="title">Admin Login</h3>
          <div class="flex flex-col">
            <!-- Username -->
            <md-filled-text-field
              v-model="user"
              class="mt-4"
              label="Username"
              @keydown.enter="login"
              :disabled="isDisabled"
              placeholder="Enter username"
            >
              <md-icon slot="leadingicon">person</md-icon>
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
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "~/store";

import VCard from "~/components/VCard.vue";

const user = ref("");
const pass = ref("");
const isDisabled = ref(false);
const isLoading = ref(false);
const loginLabel = ref("Login");

const store = useStore();
const router = useRouter();

function login() {
  
}
</script>

<style lang="scss" scoped>

</style>