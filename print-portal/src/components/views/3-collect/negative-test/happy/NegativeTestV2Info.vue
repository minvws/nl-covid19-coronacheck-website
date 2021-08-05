<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import testInfoMixin from '@/components/views/3-collect/_shared/test-info-mixin'

export default {
    name: 'NegativeTestV2Info',
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
            return this.signedEvent.event.negativetest;
        },
        testLocation() {
            if (this.$store.state.testCode) {
                const testProviderIdentifier = this.$store.state.testCode.split('-')[0]
                const testProvider = this.$store.getters['testProviders/getTestProviderByIdentifier'](testProviderIdentifier);
                if (testProvider) {
                    return testProvider.name;
                } else {
                    return this.$t('unknown');
                }
            } else {
                return this.$t('unknown');
            }
        },
        testTypeNL() {
            const testType = this.$store.getters.getNlTestType(this.proofEvent.testType)
            return testType ? testType.name : this.$t('unknown')
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
                                {{$t('components.test.yourCredentials')}}:
                            </dt>
                            <dd>
                                {{holder.discreteInfoString}}
                            </dd>
                        </div>
                    </div>
                    <div class="dl__section">
                        <div class="dl__row">
                            <dt>
                                {{$t('components.test.info.testType')}}:
                            </dt>
                            <dd>
                                {{testTypeNL}}
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
                                {{$t('components.test.info.testLocation')}}:
                            </dt>
                            <dd>
                                {{testLocation}}
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
