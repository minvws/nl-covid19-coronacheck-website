<template>
  <div class="home">
    <QRScannerNav class="nav" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QRScannerNav from '@/qr/components/QRScanner/QRScannerNav.vue'

export default Vue.extend({
    name: 'Home',
    components: {
        QRScannerNav
    }
})
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav {
  ::v-deep a {
    display: block;
    text-decoration: none;
    font-size: 1.4em;
    padding: 0.3em;
  }
}
</style>
