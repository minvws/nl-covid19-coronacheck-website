<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'CollectVaccination',
    components: { Page, PageIntro },
    computed: {},
    methods: {
        getToken() {
            this.mgr.getVaccinations();
        },
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        }
    }
}
</script>

<template>
    <Page
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.collectVaccination.pageHeader')"
                :intro="$t('views.collectVaccination.pageIntro')"/>
            <div class="section-block">
                 <div class="section-block__footer">
                    <button
                        type="button"
                        class="btn"
                        @click="getToken">
                        {{$t('views.collectVaccination.loginDigid')}}
                    </button>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
