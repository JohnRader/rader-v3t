<script setup lang='ts'>
import { VCard } from 'vuetify/lib/components/index';

import { UserInfo } from 'firebase/auth';

const props = defineProps<{
  user: UserInfo | null,
}>();
</script>
<template>
  <VCard class="profile-card">
    <h1 class="d-flex justify-center">Hello, {{ user?.displayName }}</h1>
    <div class="d-flex flex-column px-4">
      <img class="profile-card__img mr-2" :src="'src/assets/logo.png'" />
      <div class="d-flex flex-column">
        <span>
          <strong>Email:</strong>
          {{ user?.email }}
        </span>
        <span>
          <strong>Phone:</strong>
          {{ user?.phoneNumber }}
        </span>
        <span>
          <strong>Provider:</strong>
          {{ user?.providerId }}
        </span>
        <span>
          <strong>Name</strong>
          {{ user?.displayName }}
        </span>
      </div>
    </div>
  </VCard>
</template>

<style lang="scss">
.profile-card {
  &__img {
    width: 60px;
    height: 60px;
  }
}
</style>