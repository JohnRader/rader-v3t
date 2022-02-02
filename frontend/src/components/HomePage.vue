<script lang="ts">
import { VCard, VContainer } from 'vuetify/lib/components/index';

export default {
  components: {
    VCard,
    VContainer
  },
  setup(): void {
    // do something...
  },
};
</script>

<template>
  <VContainer class="pt-8">
    <VCard class="main-content"></VCard>
  </VContainer>
</template>

<style lang="scss">
.main-content {
  height: 560px;
}
</style>
