<script setup lang="ts">
import { VApp, VMain, VNavigationDrawer } from 'vuetify/lib/components/index';
import { ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import { RouterView } from 'vue-router';

const theme = ref<string>('light');

const toggleTheme = (darkMode: boolean) => {
  theme.value = darkMode ? 'dark' : 'light'
};
</script>

<template>
  <VApp :theme="theme">
    <VNavigationDrawer />
    <SiteHeader @toggle-theme="toggleTheme" />
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>
