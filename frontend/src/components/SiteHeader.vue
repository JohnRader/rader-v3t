<script setup lang="ts">
import { VAppBar, VBtn, VIcon, VSwitch } from 'vuetify/lib/components/index';
import { getCurrentInstance, computed, ref } from 'vue';

const internalInstance = getCurrentInstance();

const darkMode = ref<boolean>(false);

const theme = internalInstance?.appContext.config.globalProperties;

const switchText = computed(() => {
  return darkMode.value ? 'Enable Light Mode' : 'Enable Dark Mode';
});

const toggleDarkMode = (): void => {
  darkMode.value = !darkMode.value;
};

</script>

<template>
  <VAppBar app>
    <div>
      <VSwitch @change="toggleDarkMode" :label="`${switchText}`" class="mt-0" hide-details />
      <span class="d-flex">theme: {{ theme }}</span>
    </div>
    <div class="header-controls">
      <VBtn class="mx-4" icon>
        <VIcon>mdi-magnify</VIcon>
      </VBtn>
      <VBtn class="mx-4" icon>
        <VIcon>mdi-account</VIcon>
      </VBtn>
      <VBtn class="mx-4" icon>
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
