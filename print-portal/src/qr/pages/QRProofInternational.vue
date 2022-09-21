<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
         <PageIntro v-bind="intro"/>
        <div class="section-block">
             <PrintFaqLink v-if="link" v-bind="{ label, ...link }"/>
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import PrintFaqLink from '@/components/views/4-print/PrintFaqLink.vue'
import { getPageHeaderIntro, getPageLink } from '@/qr/utils/QRPage'
export default Vue.extend({
    components: {
        Page,
        PageIntro,
        PrintFaqLink
    },
    props: {
        link: {
            type: Object,
            required: false
        }
    },
    computed: {
        label () {
            return getPageLink('chooseInternationalQR')
        },
        intro () {
            return getPageHeaderIntro('chooseInternationalQR')
        }
    }
})
</script>
