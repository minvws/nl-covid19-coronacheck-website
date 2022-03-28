import { RouteConfig } from 'vue-router'
import QRGeneralPage from '@/qr/pages/QRGeneralPage.vue'
import QRScannerPage from '@/qr/pages/QRScannerPage.vue'
import QRFromImageOrPDFPage from '@/qr/pages/QRFromImageOrPDFPage.vue'
import QRProofDomestic from '@/qr/pages/QRProofDomestic.vue'
import QRProofInternational from '@/qr/pages/QRProofInternational.vue'
import QRProofNone from '@/qr/pages/QRProofNone.vue'
import QRProofIntroductionPage from '@/qr/pages/QRProofIntroductionPage.vue'
import QRLetterCombinationPage from '@/qr/pages/QRLetterCombinationPage.vue'

import i18n from '@/i18n'

export enum RouterNames {
    MISSING_VACCINATION = 'chooseMissingVaccination',
    CHOOSE_ADD_PROOF = 'chooseAddProof',
    CAMERA = 'camera',
    FILE = 'file',
    PROOF_DOMESTIC = 'proofDomestic',
    PROOF_INTERNATIONAL = 'proofInternational',
    PROOF_NONE = 'proofNone',
    PROOF_INTRODUCTION = 'proofIntroduction',
    LETTER_COMBINATION = 'letterCombination',
    NO_LETTER_COMBINATION = 'noLetterCombination',
    SCANNER_COMPLETE = 'scannerComplete'

}
const routes: Array<RouteConfig> = [
    {
        path: '/kies-bewijs-toevoegen',
        name: RouterNames.CHOOSE_ADD_PROOF,
        component: QRGeneralPage,
        props: {
            routes: [
                {
                    name: RouterNames.CAMERA,
                    ...(i18n.t('qr.camera.route') as Record<string, unknown>),
                    icon: require('@/qr/assets/icons/camera.svg')
                },
                {
                    name: RouterNames.FILE,
                    ...(i18n.t('qr.file.route') as Record<string, unknown>),
                    icon: require('@/qr/assets/icons/upload.svg')
                }
            ]
        }
    },
    {
        path: '/vaccinatie-ontbreekt',
        name: RouterNames.MISSING_VACCINATION,
        component: QRGeneralPage,
        props: {
            routes: [
                {
                    name: RouterNames.LETTER_COMBINATION,
                    ...(i18n.t('views.chooseMissingVaccination.options.domestic') as Record<string, unknown>)
                },
                {
                    name: RouterNames.PROOF_INTERNATIONAL,
                    ...(i18n.t('views.chooseMissingVaccination.options.international') as Record<string, unknown>)
                },
                {
                    name: RouterNames.PROOF_NONE,
                    ...(i18n.t('views.chooseMissingVaccination.options.none') as Record<string, unknown>)
                }
            ]
        }
    },
    {
        path: '/nederlands-bewijs',
        name: RouterNames.PROOF_DOMESTIC,
        component: QRProofDomestic
    },
    {
        path: '/internationaal-bewijs',
        name: RouterNames.PROOF_INTERNATIONAL,
        props: {
            link: {
                to: {
                    name: RouterNames.SCANNER_COMPLETE
                }
            }
        },
        component: QRProofInternational
    },
    {
        path: '/geen-bewijs',
        name: RouterNames.PROOF_NONE,
        props: {
            link: {
                to: {
                    name: RouterNames.SCANNER_COMPLETE
                }
            }
        },
        component: QRProofNone
    },
    {
        path: '/scanner-complete',
        name: RouterNames.SCANNER_COMPLETE,
        component: QRProofNone
    },
    {
        path: '/camera',
        name: RouterNames.CAMERA,
        component: QRScannerPage
    },
    {
        path: '/file',
        name: RouterNames.FILE,
        component: QRFromImageOrPDFPage
    },
    {
        path: '/bewijs-start',
        name: RouterNames.PROOF_INTRODUCTION,
        props: {
            link: {
                to: {
                    name: RouterNames.CHOOSE_ADD_PROOF
                }
            }
        },
        component: QRProofIntroductionPage
    },
    {
        path: '/geen-lettercombinatie',
        name: RouterNames.NO_LETTER_COMBINATION,
        props: {
            link: {
                to: {
                    name: RouterNames.SCANNER_COMPLETE
                }
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/lettercombinatie-invullen',
        name: RouterNames.LETTER_COMBINATION,
        props: {
            link: {
                to: {
                    name: RouterNames.NO_LETTER_COMBINATION
                }
            }
        },
        component: QRLetterCombinationPage
    }
]

export default routes
