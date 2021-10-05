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
            document: null,
            isRendering: false
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
    methods: {
        async createDocument() {
            this.isRendering = true;
            const holderConfig = this.$store.state.holderConfig;

            // todo remove this
            // temp hack to be able to process mulitple DCCs
            let proofs = [];
            if (this.region === 'domestic') {
                const proofContainer = { domestic: null, european: null };
                proofContainer[this.region] = this.proof;
                proofs = parseProofData(proofContainer, holderConfig, this.currentLanguage.locale);
            } else {
                for (const proofItem of this.proof) {
                    const proofContainer = { domestic: null, european: null };
                    proofContainer.european = proofItem;
                    const parsed = parseProofData(proofContainer, holderConfig, this.currentLanguage.locale);
                    proofs.push(parsed[0]);
                }
            }
            const options = {
                proofs,
                locale: this.currentLanguage.locale,
                qrSizeInCm: QRSizeInCm,
                createdAt: this.$store.state.signedAt
            }
            return await getDocument(options);
        },
        async downloadPDF() {
            const document = await this.createDocument();
            document.save(this.fileName);
            this.isRendering = false;
        },
        async openPDF() {
            const document = await this.createDocument();
            const string = document.output('datauristring');
            const embed = '<embed width="100%" height="100%" src="' + string + '"/>';
            const action = window.open();
            action.document.open();
            action.document.write(embed);
            action.document.close();
            action.document.title = this.metadata.title;
            this.isRendering = false;
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
                    :disabled="isRendering"
                    :label="$t('components.proofRegion.openPDF')"/>
                <CcButton
                    @select="downloadPDF()"
                    id="download-pdf"
                    :disabled="isRendering"
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
}
</style>
