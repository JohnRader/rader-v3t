<script setup lang="ts">
import { VApp, VMain } from 'vuetify/lib/components/index';
import HomePage from './components/HomePage.vue';
import SiteHeader from './components/SiteHeader.vue';

</script>

<template>
  <VApp>
    <SiteHeader />
    <VMain>
      <HomePage />
    </VMain>
  </VApp>
</template>

<style lang="scss" src="./styles/index.scss"></style>
