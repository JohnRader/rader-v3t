<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { 
  VContainer, VCardActions, VCard, VRow, VCol, VCardTitle, VImg, VIcon,
} from 'vuetify/lib/components/index'

interface Dashboard {
  title: string,
  src: string,
  icon: string,
  color: string,
  route: string,
}

@Options({
  components: {
    VImg,
    VRow,
    VCol,
    VIcon,
    VCard,
    VContainer,
    VCardTitle,
    VCardActions,
  }
})
export default class HomePage extends Vue {
  dashBoards: Dashboard[] = [
    {
      title: 'Dashboard 1',
      src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      icon: 'mdi-home',
      color: 'blue',
      route: '/dashboard1',
    },
    {
      title: 'Dashboard 2',
      src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
      icon: 'mdi-magnify',
      color: 'blue',
      route: '/dashboard2',
    },
    {
      title: 'Dashboard 3',
      src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
      icon: 'mdi-close',
      color: 'blue',
      route: '/dashboard3',
    },
  ]
  
}
</script>

<template>
  <VContainer>
    <VRow class="pt-12">
      <VCol cols="9">
        <div
          v-for="dashBoard in dashBoards"
          :key="dashBoard.title"
          class="pb-4"
        >
          <VCard>
            <VImg :src="dashBoard.src">
              <VCardTitle>{{ dashBoard.title }}</VCardTitle>
            </VImg>
            <VCardActions class="pa-4">
              <span class="pr-3 body-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
              <VBtn icon>
                <VIcon>{{ dashBoard.icon }}</VIcon>
              </VBtn>
            </VCardActions>
          </VCard>
        </div>
      </VCol>
      <VCol>
        <!-- TODO: make this component -->
        <VCard class="side-bar">
        </VCard>
      </VCol>
    </VRow>
    
  </VContainer>
</template>

<style lang="scss">
.side-bar {
  height: 860px;
}
</style>