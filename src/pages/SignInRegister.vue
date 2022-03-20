<script setup lang='ts'>
import { VContainer, VCard } from 'vuetify/lib/components/index';
import LoginForm from '@/components/login-register/LoginForm.vue';
import RegisterForm from '@/components/login-register/RegisterForm.vue';

import { UserStore } from '@/stores/user-store';

const store = UserStore();
</script>

<template>
  <VContainer class="d-flex justify-center">
    <VCard class="px-2" :width="400">
      <LoginForm @form-submit="store.loginWithEmail($event)" />
      <div class="d-flex px-4 justify-space-between align-center">
        <VDivider />
        <strong class="px-3">or</strong>
        <VDivider />
      </div>
      <RegisterForm />
    </VCard>
  </VContainer>
</template>