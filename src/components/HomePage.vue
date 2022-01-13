<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { 
  VContainer, VCardActions, VCard, VRow, VCol, VCardTitle, VImg, VIcon,
} from 'vuetify/lib/components/index'

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
  
}
</script>

<template>
  <VContainer>
    <VRow class="pt-12">
      <VCol cols="9">
        <VCard class="main-content">
        </VCard>
      </VCol>
      <VCol>
        <VCard class="side-bar">
        </VCard>
      </VCol>
    </VRow>
    
  </VContainer>
</template>

<style lang="scss">
.main-content {
  height: 560px;
}
.side-bar {
  height: 560px;
}
</style>