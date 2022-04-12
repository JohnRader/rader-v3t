<script setup lang="ts">
import { VContainer } from 'vuetify/lib/components/index';
import { onBeforeUnmount } from 'vue';
import UserCard from '@/components/account/UserCard.vue';
import { UserStore, updateLocalStoragePreferences } from '@/stores/user-store';

const store = UserStore();

onBeforeUnmount(() => {
  if (store.user) {
    updateLocalStoragePreferences(store.user.preferences);
  }
});
</script>

<template>
  <VContainer>
    <UserCard />
  </VContainer>
</template>
