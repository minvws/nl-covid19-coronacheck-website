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
            <h2>
                {{$t('components.proofRegion.' + region + '.title')}}
            </h2>
            <p>
                {{$t('components.proofRegion.' + region + '.intro')}}
            </p>
            <div
                class="print-buttons">
                <div>
                    <button
                        class="open-pdf"
                        @click.prevent="openPDF()"
                        href="#"
                        id="open-pdf"
                        :disabled="createdDocument === null">
                        {{ $t('components.proofRegion.viewPDF') }}
                    </button>
                </div>

                <CcButton
                    @select="downloadPDF()"
                    id="download-pdf"
                    :disabled="createdDocument === null"
                    :label="$t('components.proofRegion.downloadPDF')"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.ProofRegion {
    display: block;
    width: 460px;
    padding: 42px;
    border-radius: 12px;
    border: 1px solid $color-grey;
    align-items: center;
    margin-right: 20px;
    text-align: center;

    &__content {
        flex: 1;

        h2 {
            font-size: calc(22rem / 16);
            padding-top: 1.2em;
            margin-bottom: 16px;
        }

        p {
            font-size: calc(18rem / 16);
            line-height: 1.18;
            margin-bottom: 30px;
        }

         @include mobile() {
            h2 {
                font-size: calc(18rem / 16);
                line-height: 1.18;
            }

            p {
                font-size: calc(18rem / 16);
                line-height: 1.18;
                margin: 0 16px 30px 16px;
            }
         }
    }

    &:last-child {
        margin-right: 0;
    }

    @include mobile() {
        padding: 32px 0px;

        .print-buttons {
            button {
                min-width: 216px;
            }
        }
        .Paper {
            margin: 0 0 4px 0;
        }
    }

    .open-pdf {
        display: inline-block;
        font-size: calc(18rem / 16);
        font-weight: 700;
        padding-bottom: 20px;
        color: $color-link;
    }
}
</style>
