<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  VAppBar, VBtn, VIcon, VTextField, VCol, VRow, VForm,
} from 'vuetify/lib/components/index';
import { UserStore } from '@/stores/user-store';
import { RouteNames } from '@/router/app-router';

const store = UserStore();
const router = useRouter();
const searchInput = ref('');
const instance = getCurrentInstance();

const routeToHome = (): void => {
  router.push({ name: RouteNames.HomePage });
};

const routeToLanding = (): void => {
  router.push({ name: RouteNames.LandingPage });
};

const accountIcon = computed(() => (store.user?.uid ? 'mdi-account' : 'mdi-account-outline'));

const search = (): void => {
  // TODO: Come back to me when there are things to search
  console.log(`Searching for ${searchInput.value}...`);
};
</script>

<template>
  <VAppBar
    app
    class="app-bar"
  >
    <VRow class="app-bar__content ma-0">
      <VCol
        class="py-0"
        cols="4"
      >
        <div class="d-flex justify-start align-center column">
          <img
            class="logo"
            :src="'src/assets/logo.png'"
            @click="routeToLanding"
          >
        </div>
      </VCol>
      <VCol
        class="py-0"
        cols="4"
      >
        <div class="d-flex justify-center align-center column">
          <VForm
            class="searchbar"
            @submit="search"
          >
            <VTextField
              v-model="searchInput"
              :variant="'outlined'"
              :density="'compact'"
              :placeholder="'Search...'"
              :clearable="true"
            />
          </VForm>
        </div>
      </VCol>
      <VCol
        class="py-0"
        cols="4"
      >
        <div class="d-flex justify-end align-center column">
          <VBtn
            :variant="'plain'"
            icon
            @click="routeToHome"
          >
            <VIcon>mdi-home</VIcon>
          </VBtn>
          <VBtn
            :variant="'plain'"
            icon
            @click.stop="instance?.emit('drawer-click')"
          >
            <VIcon>{{ accountIcon }}</VIcon>
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
  &__content {
    width: 100%;
    height: 100%;
    .column {
      height: 100%;
      .searchbar {
        width: 340px;
      }
      img {
        height: 48px;
        width: 48px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
