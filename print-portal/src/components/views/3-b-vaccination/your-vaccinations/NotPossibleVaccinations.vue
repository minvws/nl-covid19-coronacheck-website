<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'NotPossibleVaccinations',
    components: { Page, PageIntro },
    methods: {
        goHome() {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<template>
    <Page
        :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.notPossibleVaccinations.pageHeader')"
                :intro="$t('views.notPossibleVaccinations.pageIntro')"/>
            <div class="section-block">
                <div class="section-block__footer">
                    <button
                        @click="goHome()"
                        type="button"
                        class="btn">
                        {{$t('goBackToStart')}}
                    </button>
                </div>
            </div>
        </div>
    </Page>
</template>
