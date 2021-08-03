<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'
import dateTool from '@/tools/date';

export default {
    name: 'RecoveryInfo',
    components: { SlotModal },
    mixins: [proofEventInfoMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.recovery;
        },
        validFrom() {
            return dateTool.dateTimeToString(this.proofEvent.validFrom, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        },
        validUntil() {
            return dateTool.dateTimeToString(this.proofEvent.validUntil, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        },
        sampleDate() {
            return dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        }
    }
}
</script>

<template>
    <portal to="root">
        <SlotModal @close="close">
            <template v-slot:head>
                {{$t('components.eventInfo.head')}}
            </template>
            <template v-slot:body>
                <p>
                    {{$t('components.recovery.info.detailsRetrieved')}}:
                </p>
                <dl>
                    <div class="dl__section">
                        <div class="dl__row">
                            <dt>
                                {{$t('components.eventInfo.name')}}:
                            </dt>
                            <dd>
                                {{holder.fullName}}
                            </dd>
                        </div>
                        <div class="dl__row">
                            <dt>
                                {{$t('components.eventInfo.dateOfBirth')}}:
                            </dt>
                            <dd>
                                {{birthDateString}}
                            </dd>
                        </div>
                    </div>
                    <div class="dl__section">
                        <div class="dl__row">
                            <dt>
                                {{$t('components.eventInfo.dateOfTest')}}:
                            </dt>
                            <dd>
                                {{sampleDate}}
                            </dd>
                        </div>
                        <div class="dl__row">
                            <dt>
                                {{$t('components.eventInfo.validFrom')}}:
                            </dt>
                            <dd>
                                {{validFrom}}
                            </dd>
                        </div>
                        <div class="dl__row">
                            <dt>
                                {{$t('components.eventInfo.validUntil')}}:
                            </dt>
                            <dd>
                                {{validUntil}}
                            </dd>
                        </div>
                    </div>
                    <div class="dl__section">
                        <div class="dl__row">
                            <dt>
                                {{$t('components.test.info.identificationCode')}}:<br>
                            </dt>
                            <dd>
                                {{identificationCode}}
                            </dd>
                        </div>
                    </div>
                </dl>
            </template>
        </SlotModal>
    </portal>
</template>
