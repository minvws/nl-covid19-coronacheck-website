<script>
import NegativeTest from '@/classes/events/NegativeTest';
import dateTool from '@/tools/date';

export default {
    name: 'NegativeTest',
    components: {},
    props: {
        negativeTest: {
            type: NegativeTest,
            required: true
        }
    },
    computed: {
        date() {
            return dateTool.dateTimeToString(this.negativeTest.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        },
        holder() {
            return this.$store.state.holder;
        }
    },
    methods: {
        openModalTestResultsAbout() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.testResultAbout.head'),
                messageBody: this.$t('message.info.testResultAbout.body', this.holder),
                closeButton: true
            })
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status">
            {{$t('components.NegativeTest.resultNegative')}}
        </div>
        <div v-if="negativeTest.protocolVersion === '2.0'">
            <div class="proof-event__line">
                {{$t('components.NegativeTest.dateOfTest')}}: {{date}}
            </div>
            <div class="proof-event__line">
                {{$t('components.NegativeTest.yourCredentials')}}: {{holder.discreteInfoString}}
            </div>
        </div>
        <div v-if="negativeTest.protocolVersion === '3.0'">
            <div class="proof-event__line">
                {{$t('components.NegativeTest.name')}}: {{holder.fullName}}
            </div>
            <div class="proof-event__line">
                {{$t('components.NegativeTest.dateOfBirth')}}: {{holder.birthDateString}}
            </div>
        </div>

        <button
            @click="openModalTestResultsAbout()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>
    </div>
</template>
