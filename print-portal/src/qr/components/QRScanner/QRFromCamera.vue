<template>
  <div class="qr-scanner">
    <PageIntro v-bind="intro" class="intro" :class="{ ready: isReady }" :aria-busy="!isReady" />
    <CameraRender :status="state">
      <template>
        <video ref="renderer" @playing="onCameraPlaying" :aria-label="$t(`qr.camera.states.${state}`)" aria-live="assertive"/>
        <CameraStatus v-bind="{ error, state }" />
      </template>
    </CameraRender>
    <div class="message">
      <SuccessMessage :codes-added="codesAdded" @clear="codesAdded = 0" />
    </div>
    <CameraList
        v-bind="{
            cameraId,
            cameras,
            pendingCameraId,
            label: $t('qr.camera.selected')
        }"
        @select="setCamera"
    />
    <CameraCaptures
      class="py"
      :label="$t('qr.code.scanned')"
      :renderer="$refs.renderer"
      :last-capture="lastCapture"
      @capture="onCapture"
      @error="openErrorInDialog"
      @clear="onCaptureClear"
    />
  </div>
</template>

<script lang="ts">
import PageIntro from '@/components/elements/PageIntro.vue';
import CameraList from './CameraList.vue'
import CameraRender from './CameraRender.vue'
import CameraStatus from './CameraStatus.vue'
import CameraCaptures from './CameraCaptures.vue'
import QrScanner, { isValidQR, ERROR_PERMISSION_REJECTED } from '@/qr/utils/QRScanner'
import SuccessMessage from '@/qr/components/SuccessMessage.vue'
import qrMixin, { QRMixin } from '@/qr/mixins/qr-mixin'
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'

import QRScannerDataType, {
    CameraFacingMode,
    CameraState
} from '@/qr/types/QRScannerDataType'
import { RouterNames } from '@/qr/router';

export default QRMixin.extend({
    name: 'QRScanner',
    mixins: [qrMixin, pageIntroMixin],
    components: {
        PageIntro,
        CameraList,
        CameraRender,
        CameraStatus,
        CameraCaptures,
        SuccessMessage
    },
    data(): QRScannerDataType {
        return {
            isReady: false,
            isAutoStart: true,
            isStartPending: false,
            isStopPending: false,
            isStarted: false,
            qrScanner: null,
            cameras: null,
            cameraId: null,
            pendingCameraId: null,
            cameraDefaultFacingMode: CameraFacingMode.ENVIRONMENT,
            error: null,
            code: null,
            codesAdded: 0,
            lastCapture: null,
            state: CameraState.NONE
        }
    },
    watch: {
        cameraId(id?: string): void {
            if (!id) return
            this.clear()
        },
        isStarted(): void {
            if (!this.isStarted) this.cameraId = null
        },
        async code(result: string) {
            if (!result) return
            try {
                await isValidQR(result, this.events);
            } catch (error) {
                const message = (error as Error)?.message || error as string
                if (!this.openErrorInDialog(message)) {
                    this.error = (error as Error)?.message || error as string
                }
                this.code = null
                return
            }
            this.onAddPendingQR({ result })
        },
        state (state) {
            if (state !== CameraState.NO_CAMERA) return
            const actions = [
                {
                    label: this.$t('qr.file.route.title') as string,
                    action: () => {
                        this.$router.replace({ name: RouterNames.FILE })
                    }
                }
            ]
            this.openErrorInDialog(state, actions)
        },
        codesAdded(codesAdded) {
            if (!codesAdded) {
                this.code = null
                this.lastCapture = null
            }
        }
    },
    methods: {
        onCameraPlaying () {
            if (!this.isStarted) return
            this.state = CameraState.PLAYING;
        },
        onCapture(result: string) {
            this.lastCapture = result
            this.clear()
            this.codesAdded++
        },
        onCaptureClear() {
            this.clear()
            this.code = null
            this.codesAdded = 0
        },
        clear() {
            this.onClearPendingQRS()
            this.error = null
        },
        getPreferredCamera(): { id: string } {
            return (
                this.cameras?.find(({ label }) =>
                    label.toLowerCase().startsWith('back')
                ) || { id: this.cameraDefaultFacingMode }
            )
        },
        async onStart(): Promise<boolean> {
            const hasCamera = await QrScanner.hasCamera();
            if (!hasCamera) {
                this.state = CameraState.NO_CAMERA;
                return false
            }
            if (this.error) {
                // when there was a camera error, and the camera is started (again)
                // retrieve the camera list
                this.clear()
                await this.listCameras()
            }
            try {
                this.isStartPending = true
                this.state = CameraState.STARTING
                await this.qrScanner?.start()
                if (!this.cameraId && this.cameras) {
                    await this.setCamera(this.getPreferredCamera())
                }
                this.isStarted = true
                this.onCameraPlaying()
                return true
            } catch (error: unknown) {
                const message = (error as Error)?.message || error as string
                if (message === ERROR_PERMISSION_REJECTED) {
                    this.state = CameraState.REJECTED
                    return false
                }
                this.error = message
            } finally {
                this.isStartPending = false
                this.isAutoStart = false
            }
            return !!this.error
        },
        onStop(): void {
            try {
                this.isStopPending = true
                this.qrScanner?.stop()
                this.isStarted = false
                this.state = CameraState.STOPPED
            } catch (error: unknown) {
                this.error = (error as Error)?.message || error as string;
            } finally {
                this.isStopPending = false
            }
        },
        async getCameraFromStream() {
            const track = (this.qrScanner?.$video.srcObject as MediaStream)?.getVideoTracks()?.[0]
            return this.cameras?.find(({ label }) => label === track?.label)
        },
        async setCamera({ id }: { id: string }): Promise<void> {
            try {
                this.isReady = false
                this.state = CameraState.SELECTED
                this.pendingCameraId = id
                await this.qrScanner?.setCamera(id)
                const camera = await this.getCameraFromStream()
                this.cameraId = camera?.id || id
                this.isReady = true
            } catch (error: unknown) {
                this.error = (error as Error)?.message || error as string
            } finally {
                this.pendingCameraId = null
            }
        },
        async listCameras() {
            this.state = CameraState.LIST
            this.cameras = await QrScanner.listCameras(this.isAutoStart)
        }
    },
    async mounted(): Promise<void> {
        await this.listCameras()
        try {
            this.qrScanner = new QrScanner(
                this.$refs.renderer as HTMLVideoElement,
                ({ data }:QrScanner.ScanResult) => {
                    this.code = data
                },
                {
                    highlightScanRegion: false,
                    highlightCodeOutline: true,
                    returnDetailedScanResult: true,
                    maxScansPerSecond: 10,
                    calculateScanRegion: ({ videoWidth: width, videoHeight: height }) => {
                        const scale = 1
                        const downScaledWidth = width * scale
                        const downScaledHeight = height * scale
                        return {
                            x: 0,
                            y: 0,
                            width,
                            height,
                            downScaledWidth,
                            downScaledHeight

                        }
                    }
                }
            )
            if (this.isAutoStart) {
                const started = await this.onStart()
                if (!started) return
            }
            this.isReady = true
        } catch (e) {
            // something went wrong with starting the camera
            this.error = this.$t('qr.error.not-started') as string
        }
    },
    beforeDestroy(): void {
        this.qrScanner?.destroy()
        this.qrScanner = null
    }
})
</script>

<style scoped lang="scss">
@import "@/styles/variables/typography.scss";
.pa {
  padding: 16px 8px;
}

.py {
  padding: 16px 0;
}

.ma {
  margin: 16px 8px;
}

.spinner {
  position: absolute;
  top: calc(50% - 32px);
  left: 50%;
  transform: translate(-50%, -50%);
}

.message {
  height: 24px;
  div {
    padding: 8px 0;
  }
}

.intro {
    opacity: 0;
    transition: opacity 0.3s;
    ::v-deep #page-intro {
        padding-bottom: 8px;
    }
    &.ready {
        opacity: 1;
    }
}

</style>
