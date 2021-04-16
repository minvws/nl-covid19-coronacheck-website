<script>
import Navigation from '@/components/elements/Navigation';
import Footer from '@/components/elements/Footer';

export default {
    name: 'TestResultPending',
    components: { Footer, Navigation },
    computed: {},
    methods: {}
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
                        {{translate('resultPending')}}
                    </h2>
                    <p>
                        {{translate('resultPendingDirection')}}
                    </p>
                    <div class="section-block__footer">
                        <router-link
                            :to="{ name: 'ProvideCode' }"
                            type="button"
                            class="button-standard">
                            {{translate('back')}}
                        </router-link>
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
