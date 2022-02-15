<script setup lang="ts">
import { VApp, VMain, VNavigationDrawer } from 'vuetify/lib/components/index';
import { ref } from 'vue';
import HomePage from './components/HomePage.vue';
import SiteHeader from './components/SiteHeader.vue';

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
      <HomePage />
    </VMain>
  </VApp>
</template>
