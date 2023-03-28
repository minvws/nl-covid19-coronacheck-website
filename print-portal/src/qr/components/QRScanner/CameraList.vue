<template>
  <div
    class="camera-list"
    :class="{ visible: !!(cameras && cameraId) }"
    @click.stop="isOpen = !isOpen"
  >
    <CameraListDropdown
        v-bind="{
            camera: selectedCamera,
            cameras: camerasWithLabels,
            disabled: !!pendingCameraId,
            label
        }"
        @select="$emit('select', $event)"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import CameraListDropdown from './CameraListDropdown.vue'
export default Vue.extend({
    components: {
        CameraListDropdown
    },
    props: {
        label: {
            type: String,
            required: false
        },
        cameraId: {
            type: String,
            required: false
        },
        pendingCameraId: {
            type: String,
            required: false
        },
        cameras: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        camera() {
            return this.getCameraById(this.cameraId)
        },
        pendingCamera() {
            return this.getCameraById(this.pendingCameraId)
        },
        cameraWithLabel() {
            const { camera } = this
            if (!camera) return undefined
            return this.getCameraWithLabel(camera)
        },
        camerasWithLabels () {
            return this.cameras?.map(camera => {
                return this.getCameraWithLabel(camera)
            })
        },
        selectedCamera () {
            return this.pendingCamera || this.camera
        }
    },
    methods: {
        getCameraById(cameraId) {
            return this.cameras?.find(({ id }) => id === cameraId)
        },
        getCameraLabel(camera) {
            if (!camera) return null
            const regex = /\W\([0-9a-z]{4}:[0-9a-z]{4}\)/gm;
            return camera.label.replace(regex, '');
        },
        getCameraWithLabel(camera) {
            if (!camera) return null
            return {
                ...camera,
                displayName: this.getCameraLabel(camera)
            }
        }
    },
    watch: {
        pendingCameraId(pendingCameraId) {
            if (!pendingCameraId) this.isOpen = false
        }
    }
})
</script>

<style lang="scss" scoped>
.camera-list {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  cursor: pointer;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
}

</style>
