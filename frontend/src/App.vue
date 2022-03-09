<script setup lang="ts">
import { VApp, VMain } from 'vuetify/lib/components/index';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';

const theme = ref<string>('light');

const toggleTheme = (darkMode: boolean) => {
  theme.value = darkMode ? 'dark' : 'light'
};
</script>

<template>
  <VApp :theme="theme">
    <SiteHeader @toggle-theme="toggleTheme" />
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>
