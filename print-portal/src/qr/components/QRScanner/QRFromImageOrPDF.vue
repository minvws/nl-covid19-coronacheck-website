<template>
  <div>
    <FileInput
      accept="image/jpeg,image/png,application/pdf"
      v-bind="{ isPending }"
      @file="onFileInput"
      @error="openDialogError"
    />
    <div class="message">
      <SuccessMessage :codes-added="codesAdded" @clear="codesAdded = 0" />
      <CameraError :error="error" @clear="error = null" />
    </div>
    <QRList
      @capture="onCapture"
      @remove="onRemoveQR"
      @remove-pending="onRemovePendingQR"
      @clear="onClearPendingQRS"
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
  </div>
</template>

<script lang="ts">
import CameraError from '@/qr/components/QRScanner/CameraError.vue'
import FileInput from '@/qr/components/QRScanner/FileInput.vue'
import FilePreview from '@/qr/components/QRScanner/FilePreview.vue'
import SuccessMessage from '@/qr/components/SuccessMessage.vue'
import QRList from '@/qr/components/QRScanner/QRList.vue'
import { scanQR, getQRFromPDFile } from '@/qr/utils/QRScanner'
import { isPDF, isImage } from '@/qr/utils/FileType'
import qrMixin, { QRMixin, QRData } from '@/qr/mixins/qr-mixin'

export default QRMixin.extend({
    mixins: [qrMixin],
    components: {
        CameraError,
        FileInput,
        FilePreview,
        QRList,
        SuccessMessage
    },
    data() {
        return {
            isPending: false,
            error: null,
            file: null,
            src: null,
            scanResult: null,
            codesAdded: 0
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
            this.codesAdded++
        },
        onClear() {
            this.onClearPendingQRS()
            this.error = this.file = null
            this.codesAdded = 0
        },
        async scanPDF(file: File) {
            try {
                const results = await getQRFromPDFile(file)
                results.forEach(result => {
                    this.onAddPendingQR(result)
                })
            } catch (error) {
                const message = (error as Error)?.message || error as string
                if (this.openErrorInDialog(message)) return
                this.error = message
            }
        },
        async onScanFile(file: File) {
            if (isPDF(file)) return this.scanPDF(file)
            else if (isImage(file)) {
                this.scanResult = await scanQR(file)
            } else {
                console.warn('unsupported file of type', file.type)
            }
        },
        async onFileInput(file: File) {
            this.onClear()
            this.file = file
            try {
                this.isPending = true
                await this.onScanFile(file)
            } catch (error: unknown) {
                const message = (error as Error)?.message || error as string
                if (!this.openErrorInDialog(message)) {
                    this.error = (error as Error)?.message || error as string
                }
            } finally {
                this.isPending = false
            }
        }
    }
})
</script>
<style lang="scss" scoped>
.message {
  position: relative;
  height: 48px;
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 8px 0;
  }
}
</style>