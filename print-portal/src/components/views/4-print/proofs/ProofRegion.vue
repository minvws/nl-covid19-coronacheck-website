<script>
import Paper from './Paper';
import CcButton from '@/components/elements/CcButton';
import { detect } from 'detect-browser';
import { getDocument, parseProofData } from 'dcc-pdf-tools';
import { QRSizeInCm } from '@/data/constants';

export default {
    name: 'ProofRegion',
    components: { CcButton, Paper },
    props: {
        proof: {
            type: [Object, Array],
            required: true
        },
        region: {
            type: String,
            required: true,
            validator: (value) => {
                return ['domestic', 'european'].indexOf(value) > -1;
            }
        }
    },
    data() {
        return {
            createdDocument: null
        }
    },
    computed: {
        browser() {
            return detect();
        },
        browserWithProblemsOpeningPDF() {
            const list = ['ie', 'safari', 'crios', 'ios'];
            return list.indexOf(this.browser.name.toLowerCase()) > -1;
        },
        fileName() {
            return 'coronacheck.pdf';
        },
        metadata() {
            return {
                title: this.$t('pdf.metadata.title'),
                author: this.$t('pdf.metadata.author')
            };
        }
    },
    async mounted() {
        await this.createDocument();
    },
    methods: {
        async createDocument() {
            const holderConfig = this.$store.state.holderConfig;
            const proofContainer = { domestic: null, european: null };
            proofContainer[this.region] = this.proof;
            const proofs = parseProofData(proofContainer, holderConfig, this.currentLanguage.locale);
            const options = {
                proofs,
                locale: this.currentLanguage.locale,
                qrSizeInCm: QRSizeInCm,
                createdAt: this.$store.state.signedAt
            }
            this.createdDocument = await getDocument(options);
        },
        downloadPDF() {
            this.createdDocument.save(this.fileName);
        },
        openPDF() {
            const string = this.createdDocument.output('datauristring');
            const embed = '<embed width="100%" height="100%" src="' + string + '"/>';
            const action = window.open();
            action.document.open();
            action.document.write(embed);
            action.document.close();
            action.document.title = this.metadata.title;
        }
    }
}
</script>

<template>
    <div class="ProofRegion">
        <Paper
            :region="region"/>
        <div class="ProofRegion__content">
            <h3>
                {{$t('components.proofRegion.' + region + '.title')}}
            </h3>
            <p>
                {{$t('components.proofRegion.' + region + '.intro')}}
            </p>
            <div
                :class="{'browser--problems': browserWithProblemsOpeningPDF}"
                class="print-buttons">
                <CcButton
                    @select="openPDF()"
                    id="open-pdf"
                    :disabled="createdDocument === null"
                    :label="$t('components.proofRegion.openPDF')"/>
                <CcButton
                    @select="downloadPDF()"
                    id="download-pdf"
                    :disabled="createdDocument === null"
                    :label="$t('components.proofRegion.openPDF')"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.ProofRegion {
    width: 460px;
    background: $color-RO_lightblue;
    padding: 40px 40px 36px 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    margin-right: 20px;

    .Paper {
        margin-right: 50px;
    }

    &__content {
        flex: 1;

        h3 {
            font-size: calc(16rem / 16);
        }

        p {
            font-size: calc(14rem / 16);
            margin-bottom: 32px;
        }

        .print-buttons {

            #open-pdf {
                display: block;

                // hide the open button on mobile. This sometimes fails and besides that it creates undesirable user experience
                @include mobile() {
                    display: none;
                }

                @include mobile-landscape-X() {
                    display: none;
                }
            }

            #download-pdf {
                display: none;

                @include mobile() {
                    display: block;
                }

                @include mobile-landscape-X() {
                    display: block;
                }
            }

            &.browser--problems {

                #open-pdf {
                    display: none;
                }

                #download-pdf {
                    display: block;
                }
            }
        }
    }

    &:last-child {
        margin-right: 0;
    }

    @include mobile() {
        display: block;
        padding: 40px 24px;

        .Paper {
            margin: 0 0 16px 0;
        }
    }
}
</style>
