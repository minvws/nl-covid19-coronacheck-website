<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import dateTool from '@/tools/date';

export default {
    name: 'VaccinationAssessmentInfo',
    components: { SlotModal },
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.vaccinationassessment;
        },
        dateString () {
            return dateTool.dateToString(this.proofEvent.date, 'datetime-with-day', this.currentLanguage.locale);
        },
        sections () {
            return [
                [
                    {
                        title: 'components.eventInfo.name',
                        value: this.signedEvent.holder.fullName
                    },
                    {
                        title: 'components.eventInfo.dateOfBirth',
                        value: this.signedEvent.holder.birthDateString
                    },
                    {
                        title: 'components.vaccinationAssessment.info.date',
                        value: this.dateString
                    },
                    {
                        title: 'components.vaccinationAssessment.info.country',
                        value: this.proofEvent.country
                    }
                ],
                [
                    {
                        title: 'components.vaccinationAssessment.info.identificationCode',
                        value: this.signedEvent.event.unique
                    }
                ]

            ]
        }
    }

}
</script>

<template>
    <portal to="root">
        <SlotModal @close="$emit('input', false)">
            <template v-slot:head>
                {{$t('components.eventInfo.head')}}
            </template>
            <template v-slot:body>
                <p>
                    {{$t('components.vaccinationAssessment.info.detailsRetrieved')}}:
                </p>
               <dl>
                    <div
                        class="dl__section"
                        v-for="(section, j) in sections"
                        :key="`section-${j}`"
                    >
                        <div
                            class="dl__row"
                            v-for="({ title, value }, i) in section"
                            :key="`item-${j}-${i}`">
                            <dt>
                                {{$t(title)}}:
                            </dt>
                            <dd>
                                {{value}}
                            </dd>
                        </div>
                    </div>
                </dl>
                <p class="title" v-html="$t('components.vaccinationAssessment.about.head')" />
                <p v-html="$t('components.vaccinationAssessment.about.body')" />
            </template>
        </SlotModal>
    </portal>
</template>

<style lang="scss" scoped>
.title {
    font-weight: bold;
    padding-top: 2em;
    margin-bottom: 0;
}
</style>
