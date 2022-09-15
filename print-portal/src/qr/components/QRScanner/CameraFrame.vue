<template>
  <div class="camera-frame">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        result: {
            type: [String, Array],
            required: false
        }
    }
})
</script>

<style lang="scss" scoped>
.camera-frame {
  position: relative;
  line-height: 0;
  border-radius: 4%;
  overflow: hidden;
  mask-image: -webkit-radial-gradient(white, black);
}
</style>
