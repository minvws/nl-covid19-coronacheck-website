<script>
import Navigation from '@/components/elements/Navigation';
import HolderIdentityCharacters from '../your-test-results/HolderIdentityCharacters';
import Footer from '@/components/elements/Footer';

export default {
    name: 'HelpTestResult',
    components: { Footer, HolderIdentityCharacters, Navigation },
    computed: {
        testResult() {
            return this.$store.state.testResult;
        },
        holder() {
            return this.testResult ? this.testResult.holder : null;
        }
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'YourTestResult' });
        }
    },
    mounted() {
        if (!this.holder) {
            this.$router.push({ name: 'YourTestResult' })
        }
    }
}
</script>

<template>
    <div class="HelpTestResult">
        <div class="pagewrap">
            <Navigation
                :callback-back="goBack"/>
            <div class="section">
                <div class="section-block">
                    <h2>
                        {{$t('aboutTestResult')}}
                    </h2>
                    <div v-html="$t('aboutTestResultDirection')"/>

                    <a name="HolderIdentityCharacters"></a>
                    <HolderIdentityCharacters
                        :holder="holder"/>
                    <h3>
                        {{$t('yourCredentialsWrong')}}
                    </h3>
                    <p>
                        {{$t('yourCredentialsWrongDirection')}}
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<style lang="scss">
.HelpTestResult {

    .HolderIdentityCharacters {
        padding: 40px 0 70px 0;
    }
}
</style>
