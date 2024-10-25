<script setup async lang="ts">
import { reactive } from "vue";
import alert from '@/components/common/alert.vue'
import type { IUserParams } from "~/types/user";
import {useRegisterUser} from "~/composables/auth/register";

const userParams:IUserParams = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user'
})

const { submitUser, alertContent,errors } = useRegisterUser()

</script>

<template>
  <div>
    <h1>Register</h1>
    <v-form @submit.prevent="submitUser(userParams)">
      <v-text-field
        v-model="userParams.username"
        label="Username"
        type="text"
        clearable
        required
        :error="!!errors.username"
        :error-messages="errors.username"
        :class="{'error-border': !!errors.username}"
      ></v-text-field>
      
      <v-text-field
        v-model="userParams.email"
        label="Email"
        type="email"
        clearable
        required
        :error="!!errors.email"
        :error-messages="errors.email"
        :class="{'error-border': !!errors.email}"
      ></v-text-field>
      
      <v-text-field
        v-model="userParams.password"
        label="Password"
        type="password"
        clearable
        required
        :error="!!errors.password"
        :error-messages="errors.password"
        :class="{'error-border': !!errors.password}"
      ></v-text-field>
      
      <v-text-field
        v-model="userParams.confirmPassword"
        label="Confirm Password"
        type="password"
        clearable
        required
        :error="!!errors.confirmPassword"
        :error-messages="errors.confirmPassword"
        :class="{'error-border': !!errors.confirmPassword}"
      ></v-text-field>
      
      <v-select
        v-model="userParams.role"
        :items="['user', 'admin']"
        label="Role"
        required
        :error="!!errors.role"
        :error-messages="errors.role"
        :class="{'error-border': !!errors.role}"
      ></v-select>
      
      <div class="d-flex flex-wrap justify-center mb-5">
        <v-btn class="mb-5" color="primary" type="submit">Submit</v-btn>
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