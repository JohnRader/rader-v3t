<script lang="ts">
import HomePage from './components/HomePage.vue';
import SiteHeader from './components/SiteHeader.vue';

export default {
  components: {
    HomePage,
    SiteHeader,
  },
  setup(): void {
    // do something...
  },
};
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
