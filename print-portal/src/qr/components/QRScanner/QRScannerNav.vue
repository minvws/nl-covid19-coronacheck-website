<template>
  <header>
    <router-link
      class="link"
      v-for="{ name, title, description } in routes"
      :to="{ name }"
      :key="description"
    >
      <div class="inner">
        <p>
          <b>{{ title }}</b>
        </p>
        <span>{{ description }}</span>
      </div>
    </router-link>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    computed: {
        routes() {
            const routes = [
                {
                    name: 'camera',
                    ...(this.$t('qr.camera.route') as Record<string, unknown>)
                },
                {
                    name: 'file',
                    ...(this.$t('qr.file.route') as Record<string, unknown>)
                }
            ]
            const routerName = this.$route.name
            return routes.filter(({ name }) => name !== routerName)
        }
    }
})
</script>

<style lang="scss" scoped>
.link {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.04);
  color: black;
  margin: 32px 16px;
}
.inner {
  padding: 8px 16px 32px 16px;
}
</style>
