<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import testInfoMixin from '@/components/views/3-collect/_shared/test-info-mixin'

export default {
    name: 'PositiveTestInfo',
    components: { SlotModal },
    mixins: [testInfoMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.positivetest;
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
                    {{$t('components.positiveTest.info.detailsRetrieved')}}:
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
                                {{$t('components.test.info.testType')}}:
                            </dt>
                            <dd>
                                {{testType}}
                            </dd>
                        </div>
                        <div class="dl__row">
                            <dt>
                                {{$t('components.test.info.testName')}}:
                            </dt>
                            <dd>
                                {{testName}}
                            </dd>
                        </div>
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
                                {{$t('components.eventInfo.testResult')}}:
                            </dt>
                            <dd>
                                {{$t('components.test.info.testResultPositive')}}
                            </dd>
                        </div>
                        <div class="dl__row">
                            <dt>
                                {{$t('components.test.info.testManufacturer')}}:
                            </dt>
                            <dd>
                                {{testManufacturer}}
                            </dd>
                        </div>
                        <div class="dl__row">
                            <dt>
                                {{$t('components.test.info.testLocation')}}:
                            </dt>
                            <dd>
                                {{testLocation}}
                            </dd>
                        </div>
                        <div class="dl__row">
                            <dt>
                                {{$t('components.test.info.testCountry')}}:
                            </dt>
                            <dd>
                                {{testCountry}}
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
