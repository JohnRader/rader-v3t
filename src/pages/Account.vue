<script setup lang="ts">
import { VContainer, VCard, VDivider } from 'vuetify/lib/components/index';
import LoginForm from '@/components/login-register/LoginForm.vue';
import RegisterForm from '@/components/login-register/RegisterForm.vue';

// TODO: move to services
import { login, logout } from '@/services/auth/auth';

interface EmailLogin {
  email: string;
  password: string;
}

// TODO: move to pinia
async function emailLogin(credentials: EmailLogin): Promise<void> {
  await login(credentials);
}

async function signOut(): Promise<void> {
  await logout();
}
</script>

<template>
  <VContainer>
    <div class="d-flex justify-center">
      <VCard class="px-2" :width="400">
        <LoginForm @form-submit="emailLogin($event)" @sign-out="signOut" />
        <div class="d-flex px-4 justify-space-between align-center">
          <VDivider />
          <strong class="px-3">or</strong>
          <VDivider />
        </div>
        <RegisterForm />
      </VCard>
    </div>
  </VContainer>
</template>