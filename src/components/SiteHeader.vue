<script setup lang="ts">
import { RouteNames } from '@/router/app-router';
import { useRouter } from 'vue-router';
import { getCurrentInstance, ref } from 'vue';
import { VAppBar, VBtn, VIcon, VSwitch, VCol, VRow } from 'vuetify/lib/components/index';

const darkMode = ref<boolean>(false);
const icon = ref<string>('mdi-weather-sunny');
const instance = getCurrentInstance();
const router = useRouter();

const toggleTheme = (): void => {
  darkMode.value = !darkMode.value;
  icon.value = darkMode.value ? 'mdi-weather-night' : 'mdi-weather-sunny';
  instance?.emit('toggle-theme', darkMode.value);
};

const routeToAccount = (): void => {
  router.push({ name: RouteNames.AccountPage });
}

const routeToHome = (): void => {
  router.push({ name: RouteNames.HomePage });
}
</script>

<template>
  <VAppBar app class="app-bar">
    <VRow class="app-bar__content ma-0">
      <VCol class="py-0" cols="4">
        <div class="d-flex align-center column">
          <VIcon class="ma-4 theme-icon" @click="toggleTheme">{{ icon }}</VIcon>
          <VSwitch v-model="darkMode" flat hide-details :color="'secondary'" @click="toggleTheme" />
        </div>
      </VCol>
      <VCol class="py-0" cols="4">
        <div class="d-flex justify-center align-center column">
          <img :src="'src/assets/logo.png'" />
        </div>
      </VCol>
      <VCol class="py-0" cols="4">
        <div class="d-flex justify-end align-center column">
          <VBtn :variant="'contained-flat'" icon @click="routeToHome">
            <VIcon>mdi-home</VIcon>
          </VBtn>
          <VBtn :variant="'contained-flat'" icon @click="routeToAccount">
            <VIcon>mdi-account</VIcon>
          </VBtn>
          <VBtn :variant="'contained-flat'" icon>
            <VIcon>mdi-cog-outline</VIcon>
          </VBtn>
        </div>
      </VCol>
    </VRow>
  </VAppBar>
</template>

<style lang="scss">
.app-bar {
  .v-toolbar__content {
    padding: 0;
  }
  .v-switch {
    .v-label {
      height: unset; // remove label from switch component
    }
  }
  &__content {
    width: 100%;
    height: 100%;
    .column {
      height: 100%;
    }
    img {
      :hover {
        cursor: pointer;
      }
      height: 48px;
      width: 48px;
    }
    .theme-icon {
      cursor: pointer;
    }
  }
}
</style>
