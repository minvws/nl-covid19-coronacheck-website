<script>
import SignedEvent from '@/classes/events/SignedEvent';
import dateTool from '@/tools/date';
import VaccinationAssessmentInfo from './VaccinationAssessmentInfo';
import InfoButton from '@/components/views/3-collect/_shared/InfoButton';

export default {
    name: 'VaccinationAssessment',
    components: { InfoButton, VaccinationAssessmentInfo },
    // components: { NegativeTestInfo, InfoButton },
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    data () {
        return {
            showInfo: false
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.vaccinationassessment;
        },
        dateString () {
            return dateTool.dateToString(this.proofEvent.date, 'datetime-with-day', this.currentLanguage.locale);
        },
        items () {
            return [
                {
                    title: 'components.vaccinationAssessment.info.date',
                    value: this.dateString
                },
                {
                    title: 'components.eventInfo.name',
                    value: this.signedEvent.holder.fullName
                },
                {
                    title: 'components.eventInfo.dateOfBirth',
                    value: this.signedEvent.holder.birthDateString
                }

            ]
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__line">
            <h2>{{$t('components.vaccinationAssessment.title')}}</h2>
        </div>
        <dl>
            <div
                class="proof-event__line"
                v-for="({ title, value }, index) in items"
                :key="index"
            >
                <dt>{{ $t(title) }}:</dt>
                <dd>{{ value }} </dd>
            </div>
        </dl>

        <InfoButton
            @select="showInfo = !showInfo"
            :show-info="showInfo"
        />

        <VaccinationAssessmentInfo
            v-model="showInfo"
            v-if="showInfo"
            :signed-event="signedEvent"
        />
    </div>
</template>
