<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'NoVaccinations',
    components: { Page, PageIntro },
    computed: {},
    methods: {
        goHome() {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<template>
    <Page :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.noVaccinations.pageHeader')"
                :intro="$t('views.noVaccinations.pageIntro')"/>
            <div class="section-block">
                <div class="section-block__footer">
                    <button
                        @click="goHome()"
                        :to="{ name: 'Home' }"
                        type="button"
                        class="btn">
                        {{$t('goBackToStart')}}
                    </button>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss" scoped>
.NoVaccinations {

}
</style>
