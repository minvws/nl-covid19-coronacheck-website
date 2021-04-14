<script>
import Navigation from '@/components/elements/Navigation';
import HolderIdentityCharacters from '../your-test-results/HolderIdentityCharacters';

export default {
    name: 'HelpTestResult',
    components: { HolderIdentityCharacters, Navigation },
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
                        {{translate('aboutTestResult')}}
                    </h2>
                    <div v-html="translate('aboutTestResultDirection')"/>

                    <HolderIdentityCharacters
                        :holder="holder"/>
                    <h3>
                        {{translate('yourCredentialsWrong')}}
                    </h3>
                    <p>
                        {{translate('yourCredentialsWrongDirection')}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.HelpTestResult {

    .HolderIdentityCharacters {
        padding: 40px 0 70px 0;
    }
}
</style>
