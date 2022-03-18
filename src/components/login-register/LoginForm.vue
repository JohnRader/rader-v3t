<script setup lang="ts">
import { ref } from 'vue';
import { VContainer, VForm, VTextField, VBtn } from 'vuetify/lib/components/index';

const formValues = ref({
  email: '',
  password: '',
});

</script>

<template>
  <VContainer>
    <h1 class="d-flex pb-4 justify-center">Sign in</h1>
    <VForm>
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
      <VBtn
        class="mb-2"
        flat
        :block="true"
        :color="'primary'"
        :variant="'contained-flat'"
        @click="$emit('form-submit', formValues)"
      >Sign In</VBtn>
      <VBtn
        class="mb-2"
        flat
        :block="true"
        :color="'primary'"
        :variant="'contained-flat'"
        @click="$emit('sign-out')"
      >Signout</VBtn>
    </VForm>
  </VContainer>
</template>
