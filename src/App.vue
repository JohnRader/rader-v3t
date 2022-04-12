<script setup lang="ts">
import {
  VApp,
  VMain,
} from 'vuetify/lib/components/index';
import { computed, ref } from 'vue';
import { RouterView } from 'vue-router';
import { getLocalStoragePreferences } from '@/stores/user-store';
import SiteHeader from './components/SiteHeader.vue';
import SettingsDrawer from './components/SettingsDrawer.vue';

const drawer = ref(false);

const toggleDrawer = (): void => {
  drawer.value = !drawer.value;
};

const darkTheme = ref<boolean>(getLocalStoragePreferences().darkMode);

const theme = computed(() => (darkTheme.value ? 'dark' : 'light'));

const changeTheme = () => {
  darkTheme.value = !darkTheme.value;
};
</script>

<template>
  <VApp
    class="app"
    :theme="theme"
  >
    <SiteHeader @drawer-click="toggleDrawer" />
    <VMain>
      <RouterView />
    </VMain>
    <SettingsDrawer
      :drawer="drawer"
      @toggle-drawer="toggleDrawer"
      @change-theme="changeTheme"
    />
  </VApp>
</template>
