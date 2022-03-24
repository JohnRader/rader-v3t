<script setup lang="ts">
import { ref, computed } from 'vue';
import { VContainer, VForm, VTextField, VBtn, VAlert, VIcon, VProgressCircular } from 'vuetify/lib/components/index';
import { UserStore } from '@/stores/user-store';
import { UserRegister, AuthProvider, AuthProviderRequests } from '@/services/auth/auth-service';

export interface RegisterForm {
  displayName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
}

const formValues = ref<RegisterForm>({
  displayName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
});

const { value: selectedAuthProvider } = ref<AuthProvider>(AuthProvider.Email);

const registerPayload = computed((): UserRegister => {
  switch (selectedAuthProvider) {
    case AuthProvider.Email:
      return {
        authProvider: selectedAuthProvider,
        registerRequest: {
          email: formValues.value.email,
          password: formValues.value.password,
        } as AuthProviderRequests[AuthProvider.Email],
        userData: {
          displayName: formValues.value.displayName,
          firstName: formValues.value.firstName,
          lastName: formValues.value.lastName,
          email: formValues.value.email,
          password: formValues.value.password,
          phoneNumber: formValues.value.phoneNumber,
        }
      };

    default:
      console.error('Unknown auth provider');
      return {
        authProvider: selectedAuthProvider,
        registerRequest: {
          email: '',
          password: '',
        },
        userData: {
          displayName: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phoneNumber: '',
        }
      };
  }
});

let store = UserStore();

const isLoading = computed(() => {
  return store.$state.loading;
});

const userRegister = async (): Promise<void> => {
  const { authProvider, registerRequest, userData } = registerPayload.value;

  try {
    await store.register({ authProvider, registerRequest, userData });
  } catch (error: any) {
    errorMessage.value = error.message;
    console.error(error);
  }
}

const errorMessage = ref('');

const clearAlert = (): void => {
  errorMessage.value = '';
}
</script>

<template>
  <VContainer>
    <h1 class="d-flex pb-4 justify-center">Register</h1>
    <VAlert v-if="errorMessage" class="mb-4" :type="'error'" :density="'compact'">
      <template #text>{{ errorMessage }}</template>
      <template #close>
        <VIcon @click="clearAlert">mdi-close</VIcon>
      </template>
    </VAlert>
    <VForm @submit="userRegister">
      <VTextField
        v-model="formValues.displayName"
        :density="'compact'"
        :label="'Username'"
        :hint="'This is the name that will be displayed to other users'"
        :variant="'outlined'"
      />
      <VTextField
        v-model="formValues.firstName"
        :density="'compact'"
        :label="'First Name'"
        :variant="'outlined'"
      />
      <VTextField
        v-model="formValues.lastName"
        :density="'compact'"
        :label="'Last Name'"
        :variant="'outlined'"
      />
      <VTextField
        v-model="formValues.email"
        :density="'compact'"
        :label="'Email'"
        :variant="'outlined'"
      />
      <VTextField
        v-model="formValues.password"
        :density="'compact'"
        :label="'Password'"
        :variant="'outlined'"
      />
      <VTextField
        v-model="formValues.phoneNumber"
        :density="'compact'"
        :label="'Phone Number'"
        :variant="'outlined'"
      />
      <VBtn
        type="submit"
        class="mb-2"
        flat
        :block="true"
        :color="'primary'"
        :variant="'contained-flat'"
        :disabled="isLoading"
      >
        <template #default>
          <span v-if="!isLoading">Register</span>
          <VProgressCircular v-if="isLoading" class="ml-2" :indeterminate="isLoading" :size="24" />
        </template>
      </VBtn>
    </VForm>
  </VContainer>
</template>

<style lang="scss">
.v_alert {
  &__close {
    align-self: center;
  }
}
</style>