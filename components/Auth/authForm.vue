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
const { submitCredentials, alertContent, errors } = useSubmitCredentials();

</script>

<template>
  <h1 class="d-flex justify-center">Login</h1>
  <div class="elevation-1 d-block align-center">
    <v-form class="ma-5" @submit.prevent="submitCredentials(credentials)">
      <v-text-field
        v-model="credentials.username"
        label="Username"
        type="text"
        clearable
        required
        :error="!!errors.username"
        :error-messages="errors.username"
        :class="{'error-border': !!errors.username}"
      ></v-text-field>
      <v-text-field
        v-model="credentials.password"
        label="Password"
        type="password"
        clearable
        required
        :error="!!errors.password"
        :error-messages="errors.password"
        :class="{'error-border': !!errors.password}"
      ></v-text-field>
      <div class="d-flex flex-wrap justify-center mb-5">
        <v-btn class="mb-5"  color="primary" type="submit">Submit</v-btn>
      </div>
    </v-form>
    <alert :show="alertContent.show" :message="alertContent.message" :type="alertContent.type" />
  </div>
</template>

<style scoped>
.error-border {
  border-color: red !important;
}
</style>