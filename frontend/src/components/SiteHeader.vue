<script lang="ts">

export default {
  setup(): void {
    // do something...
  },
};
</script>

<template>
  <VAppBar app>
    <VBtn icon>
      <VIcon>mdi-home-circle</VIcon>
    </VBtn>
    <div class="header-controls">
      <VBtn icon>
        <VIcon>mdi-magnify</VIcon>
      </VBtn>
      <VBtn icon>
        <VIcon>mdi-account</VIcon>
      </VBtn>
      <VBtn icon>
        <VIcon>mdi-dots-vertical</VIcon>
      </VBtn>
    </div>
  </VAppBar>
</template>

<style lang="scss">
.v-app-bar__content {
  align-items: center;
  justify-content: space-between;
}
</style>
