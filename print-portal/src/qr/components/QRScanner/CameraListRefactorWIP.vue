<template>
  <div class="camera-list">
      {{ selected }}
    <select v-model="selected">
        <option v-for="item in fakeCameras" :key="item.id" :value="item.id">
           {{  getCameraLabel(item) }}
        </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QrScanner from 'qr-scanner'

export default Vue.extend({
    props: {
        label: {
            type: String,
            required: false
        },
        cameraId: {
            type: String as () => QrScanner.DeviceId,
            required: false
        },
        pendingCameraId: {
            type: String as () => QrScanner.DeviceId,
            required: false
        },
        cameras: {
            type: Array as () => QrScanner.Camera[] | undefined,
            required: false
        }
    },
    computed: {
        selected: {
            get () {
                return this.cameraId || this.cameras?.[0]?.id
            },
            set (item) {
                this.$emit('select', item)
            }
        },
        fakeCameras () {
            return this.cameras
        },
        selectedCamera(): string | null {
            const { camera } = this
            return this.getCameraLabel(camera)
        },
        camera(): QrScanner.Camera | undefined {
            return this.cameras?.find(({ id }) => id === this.cameraId)
        }
    },
    methods: {
        getCameraLabel(camera?: QrScanner.Camera): string | null {
            if (!camera) return null
            const parse = camera.label.split(' ')
            return parse.splice(0, parse.length - 1).join(' ')
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables/typography.scss";
.camera-list {
    select {
        width: 100%;
        font-family: $font-main;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 18px;
        padding: 16px 24px;
        appearance: none;
        background-image: url('~@/qr/assets/icons/chevron.svg');
        background-repeat: no-repeat;
        background-position-x: calc(100% - 28px);
        background-position-y: center;
        background-size: 12px;
        option {
            // display: none;
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            z-index: 999;
            margin: 0;
            padding: 0;
            list-style: none;
            background-color: red !important;
        }
    }
}
</style>
