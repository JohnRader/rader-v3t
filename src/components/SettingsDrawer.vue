<script setup lang="ts">
import {
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VIcon,
  VSwitch,
  VDivider
} from 'vuetify/lib/components/index';
import {
  computed, ref, onBeforeMount, defineProps, getCurrentInstance,
} from 'vue';
import { useRouter } from 'vue-router';
import { UserStore, getLocalStoragePreferences } from '@/stores/user-store';
import { RouteNames } from '@/router/app-router';

const store = UserStore();
const router = useRouter();
const darkMode = ref<boolean>(false);
const instance = getCurrentInstance();

onBeforeMount(() => {
  darkMode.value = store.$state.user?.preferences.darkMode || getLocalStoragePreferences().darkMode;
});

const props = defineProps<{
  drawer: boolean
}>();

const loggedIn = computed(() => store.user?.userInfo);

const darkModeIcon = computed((): string => (darkMode.value ? 'mdi-weather-night' : 'mdi-weather-sunny'));

const drawerToggle = computed(() => props.drawer);

const toggleDrawer = (): void => {
  instance?.emit('toggle-drawer');
};

const changeTheme = (): void => {
  darkMode.value = !darkMode.value;
  store.updateUserPreferences({
    darkMode: darkMode.value,
  });
  instance?.emit('change-theme');
  toggleDrawer();
};

const routeToLanding = () => {
  router.push({ name: RouteNames.LandingPage });
  toggleDrawer();
};

const routeToHome = (): void => {
  router.push({ name: RouteNames.HomePage });
  toggleDrawer();
};

const routeToAccount = (): void => {
  router.push({ name: RouteNames.AccountPage });
  toggleDrawer();
};

const userLogout = async (): Promise<void> => {
  await store.logOut();
  toggleDrawer();
};
</script>
<template>
  <VNavigationDrawer
    v-if="drawerToggle"
    v-model="drawerToggle"
    class="settings-drawer d-flex"
    position="right"
    rounded
    temporary
    @update:model-value="toggleDrawer"
  >
    <VList class="drawer-list pb-0 d-flex flex-column justify-space-between">
      <div v-if="!loggedIn">
        <VListItem @click="changeTheme">
          <div class="d-flex">
            <VIcon class="mr-4 theme-icon">
              {{ darkModeIcon }}
            </VIcon>
            <VListItemTitle class="text-body-1">
              Dark Mode
            </VListItemTitle>
          </div>
          <VSwitch
            v-model="darkMode"
            class="justify-end"
            :density="'compact'"
            flat
            hide-details
            :color="'secondary'"
          />
        </VListItem>
        <VDivider />
        <VListItem @click="routeToLanding">
          <VIcon class="mr-4">
            mdi-help-circle-outline
          </VIcon>
          <VListItemTitle class="text-body-1">
            Help Center
          </VListItemTitle>
        </VListItem>
      </div>
      <div v-if="loggedIn">
        <VListItem @click="changeTheme">
          <div class="d-flex">
            <VIcon class="mr-4 theme-icon">
              {{ darkModeIcon }}
            </VIcon>
            <VListItemTitle class="text-body-1">
              Dark Mode
            </VListItemTitle>
          </div>
          <VSwitch
            v-model="darkMode"
            class="justify-end"
            :density="'compact'"
            flat
            hide-details
            :color="'secondary'"
          />
        </VListItem>
        <VDivider />
        <VListItem @click="routeToHome">
          <VIcon class="mr-4">
            mdi-account-circle-outline
          </VIcon>
          <VListItemTitle class="text-body-1">
            Profile
          </VListItemTitle>
        </VListItem>
        <VListItem @click="routeToAccount">
          <VIcon class="mr-4">
            mdi-cog-outline
          </VIcon>
          <VListItemTitle class="text-body-1">
            User Settings
          </VListItemTitle>
        </VListItem>
        <VListItem @click="routeToLanding">
          <VIcon class="mr-4">
            mdi-help-circle-outline
          </VIcon>
          <VListItemTitle class="text-body-1">
            Help Center
          </VListItemTitle>
        </VListItem>
      </div>
      <VListItem
        v-if="!loggedIn"
        @click="routeToAccount"
      >
        <VIcon class="mr-4">
          mdi-login-variant
        </VIcon>
        <VListItemTitle class="text-body-1">
          Log In / Sign Up
        </VListItemTitle>
      </VListItem>
      <VListItem
        v-if="loggedIn"
        @click="userLogout"
      >
        <VIcon class="mr-4">
          mdi-logout-variant
        </VIcon>
        <VListItemTitle class="text-body-1">
          Log Out
        </VListItemTitle>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style lang="scss">
.settings-drawer {
  height: 360px !important;
  .v-navigation-drawer__content {
    padding-bottom: 4px;
  }
  .drawer-list {
    height: 100%;
    .v-list-item {
      max-height: 48px;
    }
  }
}
</style>
