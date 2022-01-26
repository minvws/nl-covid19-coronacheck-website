<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import testInfoMixin from '@/components/views/3-collect/_shared/test-info-mixin'

export default {
    name: 'NegativeTestInfo',
    components: { SlotModal },
    mixins: [testInfoMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        },
        footer: {
            type: String,
            required: false
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.negativetest;
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
                    {{$t('components.test.info.detailsRetrieved')}}:
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
                                {{$t('components.test.info.testResultNegative')}}
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
                        <div class="dl__row" v-if="testCountry">
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
                            <dd class="word-wrap">
                                {{identificationCode}}
                            </dd>
                        </div>
                    </div>
                </dl>
                <template v-if="footer">
                    <p class="title" v-html="$t(`components.${footer}.info.head`)" />
                    <p v-html="$t(`components.${footer}.info.body`)" />
                </template>
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
