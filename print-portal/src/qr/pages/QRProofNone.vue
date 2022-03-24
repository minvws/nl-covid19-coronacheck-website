<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro"/>
        <div class="section-block">
            <PrintDetail
                v-for="({ name, content, summary }) in content"
                :key="name"
                v-bind="{content, summary}"
                class="details details--modest" />
        </div>
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
import PrintDetail from '@/components/views/4-print/PrintDetail.vue'
import { getFAQ, getPageHeaderIntro, getPageLink } from '@/qr/utils/QRPage'
export default Vue.extend({
    components: {
        Page,
        PageIntro,
        PrintDetail,
        PrintFaqLink
    },
    props: {
        link: {
            type: Object,
            required: false
        }
    },
    computed: {
        content () {
            return getFAQ(['recently-vaccinated', 'no-qr'])
        },
        label () {
            return getPageLink('chooseNoneQR')
        },
        intro () {
            return getPageHeaderIntro('chooseNoneQR')
        }
    }
})
</script>
