<template>
  <div class="spinner">
    <Spinner color="blue" class="inner" :visible="!error && !!label && !icon">
      <transition appear name="label">
        <div :key="label">
            <div>{{ label }}</div>
            <div class="message" v-if="message">{{ message }}</div>
        </div>
      </transition>
    </Spinner>
    <ErrorIcon class="inner" :visible="!!error || icon" :icon="icon">
      <transition appear name="label">
        <CameraError v-if="error" key="error" :error="error" />
      </transition>
    </ErrorIcon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CameraError from './CameraError.vue'
import Spinner from '@/qr/components/Spinner.vue'
import ErrorIcon from '@/qr/components/ErrorIcon.vue'
import { CameraState, showCameraState } from '@/qr/types/QRScannerDataType'
export default Vue.extend({
    name: 'CameraStatus',
    components: {
        ErrorIcon,
        CameraError,
        Spinner
    },
    props: {
        state: {
            type: String,
            required: false
        },
        error: {
            type: String,
            required: false
        }
    },
    computed: {
        icon () {
            const { state } = this
            if (state !== CameraState.NO_CAMERA) return
            return require('@/qr/assets/icons/no-camera.svg')
        },
        label() {
            const { error, state } = this
            return !error && showCameraState(state as CameraState)
                ? this.$t(`qr.camera.states.${state}`)
                : ''
        },
        message() {
            const { state } = this
            if (state !== CameraState.NO_CAMERA) return
            return this.$t(`qr.camera.message.${state}`)
        }
    }
})
</script>

<style scoped lang="scss">
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

$duration: 0.3s;
$transition-size: 18px;
.label-enter {
  opacity: 0;
  top: $transition-size;
}
.label-enter-to {
  opacity: 1;
  top: 0px;
}
.label-enter-active {
  position: relative;
  transition: all $duration;
}
.label-leave {
  opacity: 1;
  margin-top: 0px;
}
.label-leave-to {
  opacity: 0;
  margin-top: -$transition-size;
}
.label-leave-active {
  position: absolute;
  width: 100%;
  transition: all $duration;
}

.inner {
  position: absolute;
  top: -24px;
  left: 0;
  width: 100%;
}

.message {
    padding-top: 16px;
    font-weight: normal;
}

</style>
