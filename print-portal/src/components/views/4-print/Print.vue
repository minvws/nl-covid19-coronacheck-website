<script>
import Page from '@/components/elements/Page';
import ProofRegion from './proofs/ProofRegion';
import PrintFaq from './PrintFaq';
import PageIntro from '@/components/elements/PageIntro';
import { RegionTypes } from '@/types/region-types'

export default {
    name: 'Print',
    components: { PageIntro, PrintFaq, ProofRegion, Page },
    props: {
        type: {
            type: String,
            required: true
        },
        validInFuture: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        is0G () {
            return this.$store.getters.is0G;
        },
        vaccinationWithPositiveTestEnabled () {
            return this.$store.getters.vaccinationWithPositiveTestEnabled;
        },

        showPrintFaq () {
            return !this.is0G && !this.vaccinationWithPositiveTestEnabled;
        },
        regionTypes () {
            return RegionTypes;
        },
        proof() {
            const proof = this.$store.state.qrs.proof || {}
            const result = Object.keys(proof).reduce((cul, key) => {
                cul[key] = this.$store.state.qrs.proof[key]
                return cul
            }, {})
            return result;
        },
        hasDomestic() {
            return this.proof?.domestic;
        },
        hasEuropean() {
            return this.proof?.european && this.proof.european.length > 0;
        },
        pageType() {
            if (this.hasDomestic && this.hasEuropean) {
                return RegionTypes.BOTH;
            } else {
                if (this.hasDomestic) {
                    return RegionTypes.DOMESTIC;
                } else {
                    return RegionTypes.EUROPEAN;
                }
            }
        },
        regionType() {
            if (this.hasDomestic && this.hasEuropean) {
                return RegionTypes.BOTH;
            } else {
                if (this.hasDomestic) {
                    return RegionTypes.DOMESTIC
                } else {
                    return RegionTypes.EUROPEAN
                }
            }
        },
        pageHeaderCopy() {
            if (this.hasDomestic && this.hasEuropean) {
                return this.$t('views.print.pageHeader.both');
            } else {
                if (this.hasDomestic) {
                    return this.$t('views.print.pageHeader.domestic');
                } else {
                    return this.$t('views.print.pageHeader.european');
                }
            }
        },
        pageIntroCopy() {
            const type = this.is0G ? '0G' : this.regionType

            let copy = this.$t(`views.print.pageIntro.${type}`, { type: this.proofTypeCopy });
            if (this.validInFuture) {
                copy += this.$t('views.print.validInFuture');
            }
            return copy;
        },
        proofTypeCopy() {
            return this.$t('views.print.proofType.' + this.type);
        }
    },
    methods: {
        goBack() {
            this.$emit('back');
        }
    }
}
</script>

<template>
    <Page
        class="Print"
        @back="goBack">
        <div class="section">
            <PageIntro
                :head="pageHeaderCopy"
                :intro="pageIntroCopy"/>
            <div
                v-if="showPrintFaq"
                class="section-block">
                <PrintFaq
                    :type="type"
                    :region-type="regionType"/>
            </div>
            <div
                class="proof-regions"
                :class="{ 'has-faq': showPrintFaq }">
                <ProofRegion
                    v-if="hasDomestic"
                    :proof="proof.domestic"
                    :region="regionTypes.DOMESTIC" />
                <ProofRegion
                    v-if="hasEuropean"
                    :proof="proof.european"
                    :region="regionTypes.EUROPEAN" />
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Print {

    .proof-regions {
        display: flex;
        justify-content: center;
        width: 100%;

        &.has-faq {
            margin-top: $grid-x8;
        }

        @include tablet-custom() {
            flex-direction: column;
            .ProofRegion {
                width: 100%;
                margin-bottom: $grid-x2-5;
            }
        }

        @include mobile() {
            display: block;

            .ProofRegion {
                width: 100%;
                margin: 0 0 $grid-x2 0;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    .PrintFaq {
        margin: 0px 0 $grid-x8 0;
    }
}
</style>
