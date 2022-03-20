<script setup lang="ts">
import { ref } from 'vue';
import { VContainer, VForm, VTextField, VBtn } from 'vuetify/lib/components/index';

const formValues = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
});

</script>

<template>
  <VContainer>
    <h1 class="d-flex pb-4 justify-center">Register</h1>
    <VForm>
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
      >Register</VBtn>
    </VForm>
  </VContainer>
</template>