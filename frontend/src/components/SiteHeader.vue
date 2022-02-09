<script setup lang="ts">
import { VAppBar, VBtn, VIcon, VSwitch } from 'vuetify/lib/components/index';
import { getCurrentInstance, computed, ref } from 'vue';

</script>

<template>
  <VAppBar app>
    <VBtn :variant="'text'" class="ml-6" icon>
      <VIcon>mdi-dots-vertical</VIcon>
    </VBtn>
    <div class="mr-6 header-controls">
      <VBtn :variant="'text'" icon>
        <VIcon>mdi-magnify</VIcon>
      </VBtn>
      <VBtn :variant="'text'" icon>
        <VIcon>mdi-account</VIcon>
      </VBtn>
      <VBtn :variant="'text'" icon>
        <VIcon>mdi-cog-outline</VIcon>
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
