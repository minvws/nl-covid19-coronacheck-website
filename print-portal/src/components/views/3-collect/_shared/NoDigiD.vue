<script>
import CcModestButton from '@/components/elements/CcModestButton';
import { RouterNames } from '@/qr/router';

export default {
    name: 'NoDigiD',
    components: { CcModestButton },
    computed: {},
    methods: {
        dontHaveDigid() {
            this.$router.push({ name: RouterNames.CHOOSE_NO_DIGID });
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
