<script setup lang="ts">
import { VContainer, VBtn } from 'vuetify/lib/components/index';
import UserCard from '@/components/account/UserCard.vue';
import { UserStore } from '@/stores/user-store';

const store = UserStore();
</script>

<template>
  <VContainer>
    <UserCard :user="store.user" />
    <VBtn
      class="mb-2"
      flat
      :block="true"
      :color="'primary'"
      :variant="'contained-flat'"
      @click="store.logOut();"
    >Signout</VBtn>
  </VContainer>
</template>