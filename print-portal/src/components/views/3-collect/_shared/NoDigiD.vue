<script>
import CcModestButton from '@/components/elements/CcModestButton';
import { RouterNames } from '@/qr/router';

export default {
    name: 'NoDigiD',
    components: { CcModestButton },
    props: {
        flow: {
            type: String,
            required: true
        }
    },
    methods: {
        dontHaveDigid() {
            if (this.$store.getters.isPapEnabled) {
                this.$router.push({ name: RouterNames.CHOOSE_NO_DIGID, params: this.$props });
                return
            }
            const { href, target } = this.$t('button.digid.requestDigiD.link');
            window.open(href, target);
        }
    }
}
</script>

<template>
    <div class="no-digid">
        <CcModestButton
            @select="dontHaveDigid"
            :label="$t('components.digid.dontHaveDigid')"
            :margin-top="true"/>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables/index";

</style>
