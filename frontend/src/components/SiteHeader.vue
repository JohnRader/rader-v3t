<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import { VAppBar, VBtn, VIcon, VSwitch } from 'vuetify/lib/components/index';

const darkMode = ref<boolean>(false);
const icon = ref<string>('mdi-weather-sunny');
const instance = getCurrentInstance();

const toggleTheme = (): void => {
  darkMode.value = !darkMode.value;
  icon.value = darkMode.value ? 'mdi-weather-night' : 'mdi-weather-sunny';
  instance?.emit('toggle-theme', darkMode.value);
}
</script>

<template>
  <VAppBar app>
    <VBtn :variant="'text'" class="ml-6" icon>
      <VIcon>mdi-dots-vertical</VIcon>
    </VBtn>
    <div class="mr-6 d-flex align-center header-controls">
      <VBtn :variant="'text'" icon @click="toggleTheme">
        <VIcon>{{ icon }}</VIcon>
      </VBtn>
      <VSwitch v-model="darkMode" flat hide-details :color="'secondary'" @click="toggleTheme" />
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
