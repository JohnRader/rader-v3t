<script setup lang="ts">
import { VApp, VMain } from 'vuetify/lib/components/index';
import { computed } from 'vue';
import { UserStore } from '@/stores/user-store';
import SiteHeader from './components/SiteHeader.vue';

import { RouterView } from 'vue-router';

let store = UserStore();

const theme = computed(() => {
  return store.$state.user?.preferences.darkMode ? 'dark' : 'light';
});
</script>

<template>
  <VApp :theme="theme">
    <SiteHeader />
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>
