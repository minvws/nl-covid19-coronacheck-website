<script>
import Page from '@/components/elements/Page';

export default {
    name: 'CollectVaccination',
    components: { Page },
    computed: {},
    methods: {
        getToken() {
            this.mgr.signinRedirect();
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
            <div class="section-block">
                <h2>
                    {{$t('views.collectVaccination.pageHeader')}}
                </h2>
                <div v-html="$t('views.collectVaccination.pageIntro')"/>
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
