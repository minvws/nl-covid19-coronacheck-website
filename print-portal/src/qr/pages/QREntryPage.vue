<script lang="ts">

import QRGeneralPageVue from './QRGeneralPage.vue';
import qrMixin, { QRMixin } from '@/qr/mixins/qr-mixin'
import { Holder } from '@/qr/utils/HolderUtil';
export default QRMixin.extend({
    extends: QRGeneralPageVue,
    mixins: [qrMixin],
    created () {
        // on this page the code should be empty
        this.setLetterCombination({});
    },
    props: {
        reject: {
            type: Object,
            required: false
        }
    },
    watch: {
        holder: {
            handler (holder?: Holder) {
                // a holder is required to access this page
                if (!holder && this.reject) {
                    const { to, replace } = this.reject
                    if (replace) this.$router.replace(to)
                    else this.$router.push(to)
                }
            },
            immediate: true
        }
    }
})
</script>
