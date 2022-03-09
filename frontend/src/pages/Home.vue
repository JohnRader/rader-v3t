<script setup lang="ts">
import { VTextField, VCard, VContainer } from 'vuetify/lib/components/index';

</script>

<template>
  <VContainer class="pt-8">
    <div class="d-flex justify-center">
      <VCard :variant="'outlined'" :width="600">
        <section class="pa-6">
          <h4 class="text-h4 pb-6 text-center">Log In</h4>
          <div class="d-flex flex-column px-16 login-inputs">
            <VTextField :density="'compact'" :label="'Email'" :variant="'outlined'" />
            <VTextField :density="'compact'" :label="'Password'" :variant="'outlined'" />
          </div>
        </section>
      </VCard>
    </div>
  </VContainer>
</template>

<style lang="scss">
</style>
