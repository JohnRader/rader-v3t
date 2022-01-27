<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { VApp, VMain } from 'vuetify/lib/components/index';

import HomePage from './components/HomePage.vue';
import SiteHeader from './components/SiteHeader.vue';

@Options({
  components: {
    VApp,
    VMain,
    HomePage,
    SiteHeader,
  },
})
export default class App extends Vue {}
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
