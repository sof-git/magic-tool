<script setup async lang="ts">
import { reactive } from 'vue';
import type { ICredentials } from '@/types/user';
import alert from '@/components/common/alert.vue';  // Import the alert component
import { useSubmitCredentials } from '@/composables/auth/auth';  // Import composable

const credentials: ICredentials = reactive({
  username: '',
  password: ''
});

// Use the alert composable
// Use the composable
const { submitCredentials, alertContent } = useSubmitCredentials();
</script>

<template>
  <div class="elevation-1 d-block align-center">
    <h1 class="d-flex justify-center">Login</h1>
    <v-form class="ma-5" @submit.prevent="submitCredentials(credentials)">
      <v-text-field
        v-model="credentials.username"
        label="Username"
        type="text"
        clearable
        required
      ></v-text-field>
      <v-text-field
        v-model="credentials.password"
        label="Password"
        type="password"
        clearable
        required
      ></v-text-field>
      <div class="d-flex flex-wrap justify-center mb-5">
        <v-btn class="mb-5"  color="primary" type="submit">Submit</v-btn>
      </div>
    </v-form>
    <alert :show="alertContent.show" :message="alertContent.message" :type="alertContent.type" />
  </div>
</template>