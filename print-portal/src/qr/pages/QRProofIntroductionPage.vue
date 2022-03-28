<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro" />
        <div class="section-block">
            <img
                class="image-qr"
                src="~@/qr/assets/img/qr.svg"
                alt=""
            />
             <CcButton
                v-if="link"
                @select="next()"
                :label="$t('next')"/>
        </div>
    </div>
</Page>

</template>

<script>
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import CcButton from '@/components/elements/CcButton';
import { getPageHeaderIntro } from '@/qr/utils/QRPage'

export default Vue.extend({
    components: {
        Page,
        PageIntro,
        CcButton
    },
    props: {
        routes: {
            type: Array,
            required: false
        },
        link: {
            type: Object,
            required: false
        }
    },
    computed: {
        name () {
            const { name } = this.$route
            return name ?? ''
        },
        intro () {
            return getPageHeaderIntro(this.name)
        }
    },
    methods: {
        next () {
            if (!this.link) return
            const { to: { name } } = this.link
            this.$router.push({ name });
        }
    }
})
</script>
<style lang="scss" scoped>
.image-qr {
    display: block;
    margin-top: -1em;
    margin-bottom: 2em;
}
</style>
