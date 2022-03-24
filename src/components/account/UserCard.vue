<script setup lang='ts'>
import { VCard, VIcon, VSwitch, VProgressCircular } from 'vuetify/lib/components/index';
import { UserStore } from '@/stores/user-store';
import { UserInfo, UserPreferences } from '@/models/user-model';
import { computed, ref } from 'vue';
import router, { RouteNames } from '@/router/app-router';

let store = UserStore();

const userData = ref<UserInfo>({
  email: '',
  firstName: '',
  lastName: '',
  displayName: '',
  phoneNumber: '',
  photoURL: '',
});

const isLoading = computed(() => {
  return store.$state.loading;
});

const preferences = ref<UserPreferences>({
  darkMode: store.darkMode,
});

const changeTheme = (): void => {
  preferences.value.darkMode = !preferences.value.darkMode;
  store.updateLocalPreferences({
    darkMode: !store.darkMode,
  });
};

const icon = computed((): string => {
  return store.darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny';
});

const updateUserInfo = async (): Promise<void> => {
  if (store.user && store.user.preferences) {
    try {
      await store.modifyUserPreferences({ uid: store.user?.uid, preferences: store.user.preferences });
      router.push({ name: RouteNames.AccountPage });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<template>
  <VCard class="profile-card">
    <div class="d-flex justify-center align-center py-6">
      <img class="d-flex profile-card__img mr-2" :src="'src/assets/logo.png'" />
      <h1 class="d-flex justify-center">Hello, {{ store.user?.userInfo.displayName }}</h1>
    </div>
    <div class="d-flex flex-column px-6">
      <div class="d-flex flex-column py-6">
        <span class="text-h4">Account Details:</span>
        <div class="d-flex flex-column">
          <span>
            <strong>First Name:</strong>
            {{ store.user?.userInfo.firstName }}
          </span>
          <span>
            <strong>Last Name:</strong>
            {{ store.user?.userInfo.lastName }}
          </span>
          <span>
            <strong>Email:</strong>
            {{ store.user?.userInfo.email }}
          </span>
          <span>
            <strong>Phone:</strong>
            {{ store.user?.userInfo.phoneNumber }}
          </span>
          <span>
            <strong>PhotoURL:</strong>
            {{ store.user?.userInfo.photoURL }}
          </span>
        </div>
      </div>
      <div class="d-flex flex-column align-start py-6">
        <span class="text-h4 align-start">Preferences:</span>
        <div class="d-flex justify-center align-center">
          <strong>Theme:</strong>
          <div class="d-flex align-center">
            <VIcon class="ma-4 theme-icon" @click="changeTheme">{{ icon }}</VIcon>
            <VSwitch
              v-model="preferences.darkMode"
              flat
              hide-details
              :color="'secondary'"
              @click="changeTheme"
            />
          </div>
        </div>
        <div>
          <VBtn
            class="mb-2"
            flat
            :color="'primary'"
            :variant="'contained-flat'"
            @click="updateUserInfo"
            :disabled="isLoading"
          >
            <template #default>
              <span v-if="!isLoading">Save Changes</span>
              <VProgressCircular
                v-if="isLoading"
                class="ml-2"
                :indeterminate="isLoading"
                :size="24"
              />
            </template>
          </VBtn>
        </div>
      </div>
    </div>
    <div class="d-flex justify-center align-center">
      <VBtn
        class="mb-2"
        flat
        :color="'primary'"
        :variant="'contained-flat'"
        @click="store.logOut"
        :disabled="isLoading"
      >Signout</VBtn>
    </div>
  </VCard>
</template>

<style lang="scss">
.profile-card {
  .theme-icon {
    cursor: pointer;
  }
  &__img {
    width: 60px;
    height: 60px;
  }
}
</style>