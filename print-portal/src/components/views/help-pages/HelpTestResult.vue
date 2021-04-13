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
                    <h2>
                        Over de testuitslag
                    </h2>
                    <p>
                        Met je testuitslag worden de testdatum en jouw gegevens opgehaald.
                    </p>
                    <p>
                        Je gegevens bestaan uit: (1) de eerste letter van je voornaam, (2) de eerste letter van je
                        achternaam, (3)  je geboortedag en (4) geboortemaand.
                    </p>
                    <HolderIdentityCharacters/>
                    <h3>
                        Kloppen jouw gegevens niet met je identiteitsbewijs?
                    </h3>
                    <p>
                        Neem contact op met je testlocatie om je  gegevens te laten aanpassen.
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
