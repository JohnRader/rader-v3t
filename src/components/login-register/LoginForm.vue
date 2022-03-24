<script setup lang="ts">
import { ref, computed } from 'vue';
import { VContainer, VForm, VTextField, VBtn, VAlert, VProgressCircular } from 'vuetify/lib/components/index';
import { UserStore } from '@/stores/user-store';
import { UserLogin, AuthProvider, AuthProviderRequests } from '@/services/auth/auth-service';

let store = UserStore();

const isLoading = computed(() => {
  return store.$state.loading;
});

const { value: selectedAuthProvider } = ref<AuthProvider>(AuthProvider.Email);

const loginForm = ref<AuthProviderRequests[AuthProvider]>({
  email: '',
  password: '',
});

const loginPayload = computed((): UserLogin => {
  switch (selectedAuthProvider) {
    case AuthProvider.Email:
      return {
        authProvider: selectedAuthProvider,
        loginRequest: {
          email: loginForm.value.email,
          password: loginForm.value.password,
        } as AuthProviderRequests[AuthProvider.Email],
      };

    default:
      console.error('Unknown auth provider');
      return {
        authProvider: selectedAuthProvider,
        loginRequest: {
          email: '',
          password: '',
        },
      };
  }
});

const errorMessage = ref('');

const userLogin = async (): Promise<void> => {
  const { authProvider, loginRequest } = loginPayload.value;
  try {
    await store.login({ authProvider, loginRequest });
  } catch (error: any) {
    errorMessage.value = error.message;
    console.error(error);
  }
}

const clearAlert = (): void => {
  errorMessage.value = '';
}
</script>

<template>
  <VContainer>
    <h1 class="d-flex pb-4 justify-center">Sign in</h1>
    <VAlert v-if="errorMessage" class="mb-4" :type="'error'" :density="'compact'">
      <template #text>{{ errorMessage }}</template>
      <template #close>
        <VIcon @click="clearAlert">mdi-close</VIcon>
      </template>
    </VAlert>
    <VForm @submit="userLogin">
      <VTextField
        v-model="loginForm.email"
        :density="'compact'"
        :label="'Email'"
        :variant="'outlined'"
      />
      <VTextField
        v-model="loginForm.password"
        :density="'compact'"
        :label="'Password'"
        :variant="'outlined'"
      />
      <VBtn
        class="mb-2"
        type="submit"
        flat
        :block="true"
        :color="'primary'"
        :variant="'contained-flat'"
        :disabled="isLoading"
      >
        <template #default>
          <span v-if="!isLoading">Sign In</span>
          <VProgressCircular v-if="isLoading" class="ml-2" :indeterminate="isLoading" :size="24" />
        </template>
      </VBtn>
    </VForm>
  </VContainer>
</template>
