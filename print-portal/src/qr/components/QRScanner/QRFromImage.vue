<template>
  <div>
    <FileInput v-bind="{ isPending }" @file="onFileInput" />
    <QRList
      @capture="onCapture"
      @remove="onRemoveQR"
      @clear="onClearPendingQRS"
      @remove-pending="onRemovePendingQR"
      v-bind="{
        label: $t('qr.code.scanned'),
        result,
        captures
      }"
    />
    <FilePreview
      v-if="file"
      :file="file"
      :visible="false"
      @load="src = $event"
    />
    <CameraError :error="error" />
  </div>
</template>

<script lang="ts">
import { scanQR } from '@/qr/utils/QRScanner'
import CameraError from './CameraError.vue'
import FileInput from './FileInput.vue'
import FilePreview from './FilePreview.vue'
import QRList from '@/qr/components/QRScanner/QRList.vue'
import qrMixin, { QRMixin, QRData } from '@/qr/mixins/qr-mixin'

export default QRMixin.extend({
    mixins: [qrMixin],
    components: {
        CameraError,
        FileInput,
        FilePreview,
        QRList
    },
    data() {
        return {
            isPending: false,
            error: null,
            file: null,
            src: null,
            scanResult: null
        }
    },
    computed: {
        isScanReady() {
            return !!this.scanResult && !!this.src
        }
    },
    watch: {
        isScanReady(isScanReady) {
            if (!isScanReady) return
            const { src, scanResult: result } = this
            if (!result) return
            this.scanResult = this.src = this.file = null
            this.onAddPendingQR({ result, src })
        }
    },
    methods: {
        onCapture({ result, src }: QRData) {
            this.onAddQR({ result, src })
        },
        onClear() {
            this.onClearPendingQRS()
            this.file = null
        },
        async onFileInput(file: File) {
            this.onClear()
            this.file = file
            try {
                this.isPending = true
                this.scanResult = await scanQR(file)
            } catch (error: unknown) {
                this.error = (error as Error)?.message || error as string
            } finally {
                this.isPending = false
            }
        }
    }
})
</script>
