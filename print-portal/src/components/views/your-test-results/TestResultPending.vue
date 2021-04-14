<script>
import Navigation from '@/components/elements/Navigation';

export default {
    name: 'TestResultPending',
    components: { Navigation },
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
                        Testuitslag nog niet bekend
                    </h2>
                    <p>
                        Probeer het later nog eens.<br>
                        Neem voor vragen contact op met jouw testlocatie.
                    </p>
                    <div class="section-block__footer">
                        <button
                            @click="goto('ProvideCode')"
                            type="button"
                            class="button-standard">
                            Naar home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.TestResultPending {

}
</style>
