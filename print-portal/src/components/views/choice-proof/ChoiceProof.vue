<script>
import Page from '@/components/elements/Page';

export default {
    name: 'ChoiceProof',
    components: { Page },
    computed: {},
    methods: {
        back() {
            this.$router.push({ name: 'Home' })
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
                    {{$t('views.choiceProof.pageHeader')}}
                </h2>
                <div v-html="$t('views.choiceProof.pageIntro')"/>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
.ChoiceProof {

}
</style>
