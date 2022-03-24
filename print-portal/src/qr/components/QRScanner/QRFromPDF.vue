<template>
  <div>
    <img id="my-image" ref="img" />
    <FileInput
      v-bind="{ isPending }"
      accept="application/pdf"
      @file="onFileInput"
    />

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
    <CameraError :error="error" />
  </div>
</template>

<script lang="ts">
import { scanQR } from '@/qr/utils/QRScanner'
import QRList from '@/qr/components/QRScanner/QRList.vue'
import FileInput from '@/qr/components/QRScanner/FileInput.vue'
import CameraError from '@/qr/components/QRScanner/CameraError.vue'
import qrMixin, { QRMixin, QRData } from '@/qr/mixins/qr-mixin'
import { getImagesFromPDFFile } from '@/qr/utils/PDFJsLib'

export default QRMixin.extend({
    mixins: [qrMixin],
    components: {
        FileInput,
        QRList,
        CameraError
    },
    data() {
        return {
            isPending: false,
            error: null as string | null | Error,
            file: null
        }
    },
    methods: {
        async scanPDF(file: File) {
            const images = await getImagesFromPDFFile(file)
            const results = await Promise.all(
                images.map((src) => scanQR(src))
            )
            results.forEach((result, i) => {
                this.onAddPendingQR({ result, src: images[i] })
            })
        },
        onCapture({ result, src }: QRData) {
            this.onAddQR({ result, src })
        },
        onClear() {
            this.onClearPendingQRS()
            this.error = this.file = null
        },
        async onFileInput(file: File) {
            this.onClear()
            this.isPending = true

            try {
                await this.scanPDF(file)
            } catch (error: unknown) {
                this.error = (error as Error)?.message || error as string
            } finally {
                this.isPending = false
            }
        }
    }
})
</script>
