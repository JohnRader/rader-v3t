<script lang="ts">
import { computed, ref } from 'vue';
import { VAppBar, VBtn, VIcon, VSwitch } from 'vuetify/lib/components/index';

export default {
  components: {
    VBtn,
    VIcon,
    VSwitch,
    VAppBar,
  },
  setup(): any {
    const darkMode = ref(false);

    const switchText = computed(() => {
      return darkMode.value ? 'Enable Light Mode' : 'Enable Dark Mode';
    });

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
    };

    return {
      darkMode,
      switchText,
      toggleDarkMode,
    }
  },
};
</script>

<template>
  <VAppBar app>
    <div>
      <VSwitch
        v-model="darkMode.value"
        @change="toggleDarkMode"
        :label="`${switchText}`"
        class="mt-0"
        hide-details
      />
    </div>
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
