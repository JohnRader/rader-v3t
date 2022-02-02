<script lang="ts">

export default {
  setup(): void {
    // do something...
  },
};
</script>

<template>
  <VContainer>
    <VRow class="pt-12">
      <VCol cols="9">
        <VCard class="main-content" />
      </VCol>
      <VCol>
        <VCard class="side-bar" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss">
.main-content {
  height: 560px;
}
.side-bar {
  height: 560px;
}
</style>
