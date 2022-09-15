<template>
  <CameraFrame v-if="visible">
    <img class="image-preview" v-if="loader.result" :src="loader.result" />
  </CameraFrame>
</template>
<script>
import Vue from 'vue'
import ImageFileLoader, { Listener } from '@/qr/classes/ImageFileLoader'
import CameraFrame from './CameraFrame.vue'

export default Vue.extend({
    components: {
        CameraFrame
    },
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: true
        },
        file: {
            type: File,
            required: true
        },
        loader: {
            type: ImageFileLoader,
            required: false,
            default: () => new ImageFileLoader()
        }
    },
    watch: {
        'loader.result': {
            handler(result) {
                if (!result) return
                this.$emit('load', result)
            },
            immediate: true
        },
        file: {
            handler(file) {
                if (!file) return
                this.loader.load(file)
            },
            immediate: true
        }
    },
    mounted() {
        this.loader.configureListeners(Listener.ADD)
    },
    beforeDestroy() {
        this.loader.configureListeners(Listener.REMOVE)
    }
})
</script>

<style lang="scss" scoped>
.image-preview {
  max-width: 100%;
  max-height: 50%;
  display: block;
  margin: 0 auto;
}
</style>
