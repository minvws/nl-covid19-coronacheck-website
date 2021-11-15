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
            createdDocument: null,
            canOpenObjectUrl: false
        }
    },
    computed: {
        browser() {
            return detect();
        },
        osWithProbemsViewingPDF () {
            const oses = ['android os']
            if (oses.indexOf(this.browser.os.toLowerCase()) > -1) {
                return true
            }

            const browsers = ['fxios']
            return browsers.indexOf(this.browser.name.toLowerCase()) > -1
        },
        browserWithProblemsDownloadingPDF() {
            const names = ['ie', 'crios', 'ios'];
            return names.indexOf(this.browser.name.toLowerCase()) > -1
        },
        fileName() {
            const append = this.$t(`certificate.${this.region}`)
            return `CoronaCheck - ${append}.pdf`;
        },
        metadata() {
            return {
                title: this.$t('pdf.metadata.title'),
                author: this.$t('pdf.metadata.author')
            };
        },
        buttons () {
            const buttons = []

            if (!this.osWithProbemsViewingPDF) {
                const action = this.browserWithProblemsDownloadingPDF ? this.downloadPDF : this.canOpenObjectUrl ? this.openObjectUrl : this.openPDFWithEmbed
                buttons.push({
                    label: this.$t('components.proofRegion.viewPDF'),
                    action
                })
            }

            if (!this.browserWithProblemsDownloadingPDF) {
                buttons.push({
                    action: this.downloadPDF,
                    label: this.$t('components.proofRegion.downloadPDF')
                })
            }
            // make last button fat
            buttons[buttons.length - 1].button = true
            buttons.forEach(button => {
                button.disabled = !this.createdDocument
            })
            return buttons
        }
    },
    async mounted() {
        this.canOpenObjectUrl = !!(URL?.createObjectURL)
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
        openPDFWithEmbed() {
            const string = this.createdDocument.output('datauristring');
            const embed = '<embed width="100%" height="100%" src="' + string + '"/>';
            const action = window.open();
            action.document.open();
            action.document.write(embed);
            action.document.close();
            action.document.title = this.metadata.title;
        },
        openObjectUrl() {
            const blob = this.createdDocument?.blob
            const url = URL.createObjectURL(blob)
            const action = window.open(url);
            action.onload = () => {
                action.document.getElementsByTagName('html')[0]
                    .appendChild(document.createElement('head'))
                    .appendChild(document.createElement('title'))
                    .appendChild(document.createTextNode(this.metadata.title));
                URL.revokeObjectURL(url)
            }
        },
        onDownloadClick () {
            const blob = this.createdDocument?.blob
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.style.display = 'none'
            a.download = this.fileName
            document.body.appendChild(a)
            a.click()
            a.parentNode.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }
}
</script>

<template>
    <div class="ProofRegion">
        <Paper :region="region"/>
        <div class="ProofRegion__content">
            <h3>{{ $t('components.proofRegion.' + region + '.title') }}</h3>
            <p>{{ $t('components.proofRegion.' + region + '.intro' )}}</p>
            <div class="print-buttons">
                <template v-for="(item, index) in buttons">
                    <CcButton
                        v-if="item.button"
                        :key="index"
                        v-bind="item"
                        @select="item.action"
                    />
                    <button
                        v-else
                        :key="index"
                        class="button-pdf"
                        @click.prevent="item.action">
                            {{ item.label}}
                    </button>
                </template>
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

    .button-pdf {
        display: block;
        margin: 0 auto;
        font-size: calc(18rem / 16);
        font-weight: 700;
        padding-bottom: 20px;
        color: $color-link;
    }
}
</style>
