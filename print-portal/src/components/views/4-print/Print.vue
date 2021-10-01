<script>
import Page from '@/components/elements/Page';
import ProofRegion from './proofs/ProofRegion';

export default {
    name: 'Print',
    components: { ProofRegion, Page },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    computed: {
        proof() {
            return this.$store.state.qrs.proof;
        },
        hasDomestic() {
            return this.proof.domestic;
        },
        hasEuropean() {
            return this.proof.european;
        },
        pageType() {
            if (this.hasDomestic && this.hasEuropean) {
                return 'both';
            } else {
                if (this.hasDomestic) {
                    return 'domestic';
                } else {
                    return 'european';
                }
            }
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
            <slot></slot>
            <div class="section-block">
                Hier de accordeons
            </div>

            <div class="proof-regions">
                <ProofRegion
                    v-if="proof.domestic"
                    :proof="proof.domestic"
                    :region="'domestic'" />
                <ProofRegion
                    v-if="proof.european"
                    :proof="proof.european"
                    :region="'european'" />
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
        margin-top: 64px;
    }
}
</style>
