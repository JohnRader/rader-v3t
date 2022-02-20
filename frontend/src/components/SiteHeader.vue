<script setup lang="ts">
import { RouteNames } from '@/router/app-router';
import { useRouter } from 'vue-router';
import { getCurrentInstance, ref } from 'vue';
import { VAppBar, VBtn, VIcon, VSwitch } from 'vuetify/lib/components/index';

const darkMode = ref<boolean>(false);
const icon = ref<string>('mdi-weather-sunny');
const instance = getCurrentInstance();
const router = useRouter();

const toggleTheme = (): void => {
  darkMode.value = !darkMode.value;
  icon.value = darkMode.value ? 'mdi-weather-night' : 'mdi-weather-sunny';
  instance?.emit('toggle-theme', darkMode.value);
};

function routeToAccount(): void {
  router.push({ name: RouteNames.AccountPage });
}

function routeToHome(): void {
  router.push({ name: RouteNames.HomePage });
}
</script>

<template>
  <VAppBar app>
    <div class="d-flex align-center">
      <VBtn :variant="'text'" flat icon @click="toggleTheme">
        <VIcon>{{ icon }}</VIcon>
      </VBtn>
      <VSwitch v-model="darkMode" flat hide-details :color="'secondary'" @click="toggleTheme" />
    </div>
    <div class="mr-6 d-flex align-center header-controls">
      <VBtn :variant="'text'" icon @click="routeToHome">
        <VIcon>mdi-home</VIcon>
      </VBtn>
      <VBtn :variant="'text'" icon @click="routeToAccount">
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
