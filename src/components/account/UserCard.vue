<script setup lang='ts'>
import { VCard } from 'vuetify/lib/components/index';
import { ref } from 'vue';
import { UserStore } from '@/stores/user-store';
import { UserInfo } from '@/models/user-model';

const store = UserStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userData = ref<UserInfo>({
  email: '',
  firstName: '',
  lastName: '',
  displayName: '',
  phoneNumber: '',
  photoURL: '',
});

</script>
<template>
  <VCard class="profile-card">
    <div class="d-flex justify-center align-center py-6">
      <img
        class="d-flex profile-card__img mr-2"
        :src="'src/assets/logo.png'"
      >
      <h1 class="d-flex justify-center">
        Hello, {{ store.user?.userInfo.displayName }}
      </h1>
    </div>
    <div class="d-flex justify-space-around px-6">
      <div class="d-flex flex-column py-6">
        <span class="text-h4 pb-4">Account Details</span>
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
