<script>
import Navigation from '@/components/elements/Navigation';
import Footer from '@/components/elements/Footer';

export default {
    name: 'TestResultPending',
    components: { Footer, Navigation },
    computed: {},
    methods: {
        goBack() {
            this.$router.push({ name: 'ProvideCode' });
        }
    }
}
</script>

<template>
    <div class="TestResultPending">
        <div class="pagewrap">
            <Navigation
                :display-back-button="false"/>
            <div class="section">
                <div class="section-block">
                    <h2>
                        {{$t('resultPending')}}
                    </h2>
                    <div v-html="$t('resultPendingDirection')"/>
                    <div class="section-block__footer">
                        <button
                            @click="goBack()"
                            :to="{ name: 'ProvideCode' }"
                            type="button"
                            class="button-standard">
                            {{$t('back')}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<style lang="scss">
.TestResultPending {

}
</style>
