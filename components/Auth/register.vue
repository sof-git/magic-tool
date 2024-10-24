<script setup async lang="ts">
import { reactive } from "vue";
import alert from '@/components/common/alert.vue'
const newUser = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const alertContent = reactive({
  message: '',
  type: <'success' | 'info' | 'warning' | 'error' | undefined>(undefined),
  show: false
})

</script>

<template>
  <div>
    <h1>Register</h1>
    <v-form>
      <v-text-field
        v-model="newUser.username"
        label="Username"
        type="text"
        clearable
        required
      ></v-text-field>
    </v-form>
    <alert :message="alertContent.message" :type="alertContent.type" :show="alertContent.show" />
  </div>
</template>

<style scoped>
</style>