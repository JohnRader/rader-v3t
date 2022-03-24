<script setup lang='ts'>
import { VContainer, VCard } from 'vuetify/lib/components/index';
import LoginForm from '@/components/login-register/LoginForm.vue';
import RegisterForm from '@/components/login-register/RegisterForm.vue';

</script>

<template>
  <VContainer class="d-flex justify-center">
    <VCard class="px-2" :width="400">
      <LoginForm />
      <div class="d-flex px-4 justify-space-between align-center">
        <VDivider />
        <strong class="px-3">or</strong>
        <VDivider />
      </div>
      <RegisterForm />
    </VCard>
  </VContainer>
</template>