<script setup async lang="ts">
import AuthForm from '@/components/Auth/authForm.vue';
import registerForm from '@/components/Auth/register.vue';

definePageMeta({
  layout: false
});

const loginOrRegister = reactive({
  isLogin: true,
  message:'Not registered?',
})

const toggleRegister = () => {
  loginOrRegister.isLogin = !loginOrRegister.isLogin;
  loginOrRegister.message = loginOrRegister.isLogin ? 'Not registered?' : 'Already registered?';
}

</script>

<template>
  <main>
    <v-container>
        <v-row>
          <v-col cols="12" offset-md="3" md="6">
            <AuthForm v-if="loginOrRegister.isLogin" class="mt-5"/>
            <registerForm v-else/>
            <span class="color-primary cursor-pointer"  @click="toggleRegister">{{ loginOrRegister.message }}</span>
          </v-col>
        </v-row>
    </v-container>
  </main>
</template>

<style scoped>

</style>