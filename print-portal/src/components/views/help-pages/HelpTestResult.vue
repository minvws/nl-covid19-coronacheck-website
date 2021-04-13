<script>
import Navigation from '@/components/elements/Navigation';

export default {
    name: 'HelpTestResult',
    components: { Navigation },
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
                    <h1>
                        Over de testuitslag
                    </h1>
                    <p>
                        Met je testuitslag worden de testdatum en jouw gegevens opgehaald.
                    </p>
                    <p>
                        Je gegevens bestaan uit: (1) de eerste letter van je voornaam, (2) de eerste letter van je
                        achternaam, (3)  je geboortedag en (4) geboortemaand.
                    </p>
                    <h2>
                        Kloppen jouw gegevens niet met je identiteitsbewijs?
                    </h2>
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

}
</style>
