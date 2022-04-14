<template>
    <QRList
        @capture="onCapture"
        @remove="onRemoveQR"
        @clear="$emit('clear')"
        @remove-pending="$emit('clear')"
        v-bind="{
            label,
            result: filteredResult(lastCapture),
            captures,
        }"
    />
</template>

<script lang="ts">
import QRList from '@/qr/components/QRScanner/QRList.vue';
import capture from '@/qr/utils/CaptureFrame';
import qrMixin, { QRMixin } from '@/qr/mixins/qr-mixin';

export default QRMixin.extend({
    mixins: [qrMixin],
    components: {
        QRList
    },
    props: {
        label: {
            type: String,
            required: false
        },
        lastCapture: {
            type: String,
            required: false
        },
        renderer: {
            type: HTMLVideoElement,
            required: false
        }
    },
    methods: {
        async onCapture({ result }: { result: string }) {
            if (this.lastCapture === result) {
                return;
            }
            if (!this.renderer) {
                console.warn(this.$t('qr.error.no-started'));
                return;
            }
            this.$emit('capture', result);
            const src = await capture(this.renderer);
            this.onAddQR({ result, src });
        }
    }
});
</script>
