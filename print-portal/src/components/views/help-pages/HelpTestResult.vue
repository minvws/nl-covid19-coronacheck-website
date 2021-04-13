<script>
import Navigation from '@/components/elements/Navigation';
import HolderIdentityCharacters from '../your-test-results/HolderIdentityCharacters';

export default {
    name: 'HelpTestResult',
    components: { HolderIdentityCharacters, Navigation },
    computed: {},
    methods: {
        goBack() {
            this.goto('YourTestResult');
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
                    <header>
                        <h2>
                            {{translate('aboutTestResult')}}
                        </h2>
                    </header>
                    <div v-html="translate('aboutTestResultDirection')"/>

                    <HolderIdentityCharacters/>
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
