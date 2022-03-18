<script setup lang="ts">
import { VContainer, VForm, VTextField, VBtn } from 'vuetify/lib/components/index';
</script>

<template>
  <VContainer>
    <h1 class="d-flex pb-4 justify-center">Register</h1>
    <VForm>
      <VTextField :density="'compact'" :label="'First Name'" :variant="'outlined'" />
      <VTextField :density="'compact'" :label="'Last Name'" :variant="'outlined'" />
      <VTextField :density="'compact'" :label="'Email'" :variant="'outlined'" />
      <VTextField :density="'compact'" :label="'Password'" :variant="'outlined'" />
      <VTextField :density="'compact'" :label="'Phone Number'" :variant="'outlined'" />
      <VBtn class="mb-2" flat :block="true" :color="'primary'" :variant="'contained-flat'">Register</VBtn>
    </VForm>
  </VContainer>
</template>