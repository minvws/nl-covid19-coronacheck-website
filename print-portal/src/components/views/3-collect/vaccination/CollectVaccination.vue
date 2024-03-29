<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import { handleRejection } from '@/tools/error-handler';
import NoDigiD from '@/components/views/3-collect/_shared/NoDigiD';
import TooBusyButton from '@/components/elements/TooBusyButton';
import CcButtonDigiD from '@/components/elements/CcButtonDigiD';
import ConsentCheckbox from '@/components/elements/ConsentCheckbox';
import { StepTypes } from '@/types/step-types'
import { FlowTypes } from '@/types/flow-types'
import { ProviderTypes } from '@/types/provider-types'

import { events as StorageEvent } from '@/store/modules/storage'
export default {
    name: 'CollectVaccination',
    components: { CcButtonDigiD, TooBusyButton, NoDigiD, Page, PageIntro, ConsentCheckbox },
    data() {
        return {
            tooBusy: window.config.tooBusy
        }
    },
    props: {
        auth: {
            type: String,
            required: true
        }
    },
    mounted () {
        // clear consent when mounted
        this.withPositiveTestConsent = false
    },
    computed: {
        vaccinationWithPositiveTestEnabled () {
            return this.$store.getters.vaccinationWithPositiveTestEnabled
        },
        withPositiveTestConsent: {
            get () {
                return this.$store.getters[StorageEvent.WITH_POSITIVE_TEST]
            },
            set (value) {
                this.$store.dispatch(StorageEvent.WITH_POSITIVE_TEST, value)
            }
        },
        flow: () => FlowTypes.VACCINATION
    },
    methods: {
        getToken() {
            this.getAuthProvider(this.flow, this.auth).startAuthentication().then(() => {
                //
            }).catch(error => {
                const callback = () => {
                    this.getToken();
                }
                handleRejection(error, {
                    flow: this.flow,
                    step: StepTypes.TVS_DIGID,
                    provider_identifier: ProviderTypes.NON_PROVIDER
                }, callback);
            })
        },
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        }
    }
}
</script>

<template>
    <Page
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.collectVaccination.pageHeader')"
                :intro="$t('views.collectVaccination.pageIntro')"/>
            <div class="section-block">
                 <div class="section-block__footer">
                     <TooBusyButton v-if="tooBusy"/>
                     <ConsentCheckbox
                        v-if="vaccinationWithPositiveTestEnabled"
                        class="consent"
                        v-model="withPositiveTestConsent"
                        :title="$t('components.consent.vaccination.title')"
                        :body="$t('components.consent.vaccination.body')"
                        :checkbox="$t('components.consent.vaccination.checkbox')"
                        :consent="withPositiveTestConsent"
                    />
                     <CcButtonDigiD
                         id="digid-vaccination"
                         v-if="!tooBusy"
                         @select="getToken()"/>
                     <NoDigiD :flow="flow"/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss" scoped>
@import "@/styles/variables/sizes.scss";
.consent {
    margin-bottom: 2 * $grid-x2-5;
}
</style>
