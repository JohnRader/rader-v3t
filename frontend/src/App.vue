<script setup lang="ts">
import { VApp, VMain, VNavigationDrawer } from 'vuetify/lib/components/index';
import HomePage from './components/HomePage.vue';
import SiteHeader from './components/SiteHeader.vue';

</script>

<template>
  <VApp>
    <VNavigationDrawer />
    <SiteHeader />
    <VMain>
      <HomePage />
    </VMain>
  </VApp>
</template>
