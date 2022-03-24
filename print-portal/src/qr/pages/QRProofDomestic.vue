<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro"/>
        <div class="section-block">
            TODO
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import { getPageHeaderIntro } from '@/qr/utils/QRPage'
export default Vue.extend({
    components: {
        Page,
        PageIntro
    },
    computed: {
        intro () {
            return getPageHeaderIntro('chooseDomesticQR')
        }
    }
})
</script>
