<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import {
  VAppBar, VAppBarNavIcon, VTextField, VIcon, VBtn,
} from 'vuetify/lib/components/index';

@Options({
  components: {
    VBtn,
    VIcon,
    VAppBar,
    VTextField,
    VAppBarNavIcon,
  },
})
export default class SiteHeader extends Vue {}
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
