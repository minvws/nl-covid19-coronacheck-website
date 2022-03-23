<template>
  <header>
    <router-link
      class="link"
      v-for="{ name, title, description, icon} in routes"
      :to="{ name }"
      :key="description"
    >
      <div class="inner">
        <img class="icon" :src="icon" alt=""/>
        <div class="inner-content">
            <div class="link-title">{{title }}</div>
            <div class="link-description">{{ description }}</div>
        </div>
        <img class="next" src="@/qr/assets/icons/next.svg" alt=""/>
      </div>
    </router-link>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { RouterNames } from '@/qr/router'
export default Vue.extend({
    computed: {
        routes() {
            const routes = [
                {
                    name: RouterNames.CAMERA,
                    ...(this.$t('qr.camera.route') as Record<string, unknown>),
                    icon: require('@/qr/assets/icons/camera.svg')
                },
                {
                    name: RouterNames.FILE,
                    ...(this.$t('qr.file.route') as Record<string, unknown>),
                    icon: require('@/qr/assets/icons/upload.svg')
                }
            ]
            const routerName = this.$route.name
            return routes.filter(({ name }) => name !== routerName)
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables/typography.scss";
.link {
    font-family: $font-main;
    color: #383836;
    background: #F6FAFB;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 9px;
    margin-bottom: 24px;

    &-title {
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        padding: 16px 0 8px 0;
    }
    &-description {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        padding-bottom: 16px;
    }
}
.inner {
    display: flex;
    flex-direction: row;
    &-content {
        flex-grow: 1;
    }
}

.icon {
    width: 24px;
    height: 24px;
    align-self: center;
    margin: 0 18px;
}
.next {
    width: 16px;
    height: 16px;
    align-self: center;
    margin: 0 18px;
}
</style>
