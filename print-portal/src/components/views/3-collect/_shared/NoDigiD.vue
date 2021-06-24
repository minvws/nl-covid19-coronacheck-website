<script>
import CcModestButton from '@/components/elements/CcModestButton';

export default {
    name: 'NoDigiD',
    components: { CcModestButton },
    computed: {},
    methods: {
        dontHaveDigid() {
            const urls = {
                nl: 'https://www.digid.nl/digid-aanvragen-activeren#hoe-vraag-ik-digid-aan',
                en: 'https://www.digid.nl/en/apply-or-activate-digid'
            }
            window.open(urls[this.currentLanguage.locale])
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
