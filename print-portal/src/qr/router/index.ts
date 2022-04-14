import { RouteConfig } from 'vue-router'
import QRGeneralPage from '@/qr/pages/QRGeneralPage.vue'
import QRScannerPage from '@/qr/pages/QRScannerPage.vue'
import QRFromImageOrPDFPage from '@/qr/pages/QRFromImageOrPDFPage.vue'
import QRProofDomestic from '@/qr/pages/QRProofDomestic.vue'
import QRProofInternational from '@/qr/pages/QRProofInternational.vue'
import QRProofNone from '@/qr/pages/QRProofNone.vue'
import QRProofIntroductionPage from '@/qr/pages/QRProofIntroductionPage.vue'
import QRLetterCombinationPage from '@/qr/pages/QRLetterCombinationPage.vue'
import QRLetterCombinationValidationPage from '@/qr/pages/QRLetterCombinationValidationPage.vue'
import QRLetterCombinationInvalidPage from '@/qr/pages/QRLetterCombinationInvalidPage.vue'
import ProofsOverviewList from '@/components/views/3-collect/recovery/happy/ProofsOverviewList.vue'
import VaccinationOverview from '@/components/views/3-collect/vaccination/happy/VaccinationOverview.vue'
import RecoveryOverview from '@/components/views/3-collect/recovery/happy/RecoveryOverview.vue'

import i18n from '@/i18n'

export enum RouterNames {
    MISSING_VACCINATION = 'chooseMissingVaccination',
    CHOOSE_ADD_PROOF = 'chooseAddProof',
    CAMERA = 'cameraQR',
    FILE = 'uploadFileQR',
    PROOF_DOMESTIC = 'proofDomestic',
    PROOF_INTERNATIONAL = 'proofInternational',
    PROOF_NONE = 'proofNone',
    PROOF_INTRODUCTION = 'proofIntroduction',
    LETTER_COMBINATION = 'letterCombination',
    LETTER_COMBINATION_VALIDATION = 'letterCombinationValidation',
    LETTER_COMBINATION_INVALID = 'letterCombinationInvalid',
    NO_LETTER_COMBINATION = 'noLetterCombination',
    SCANNER_COMPLETE = 'scannerComplete',
    VACCINATION_OVERVIEW = 'vaccinationOverview',
    VACCINATION_OVERVIEW_LIST = 'vaccinationOverviewList',
    RECOVERY_OVERVIEW = 'recoveryOverview',
    RECOVERY_OVERVIEW_LIST = 'recoveryOverviewList'

}
const routes: Array<RouteConfig> = [
    {
        path: '/jouw-vaccinaties',
        component: ProofsOverviewList,
        name: RouterNames.VACCINATION_OVERVIEW_LIST,
        props: ({ params }) => {
            return {
                ...params,
                id: 'proofsOverviewList',
                link: {
                    to: {
                        name: RouterNames.MISSING_VACCINATION
                    }
                },
                next: {
                    name: RouterNames.VACCINATION_OVERVIEW
                }
            }
        }
    },
    {
        path: '/jouw-herstelbewijzen',
        name: RouterNames.RECOVERY_OVERVIEW_LIST,
        component: ProofsOverviewList,
        props: ({ params }) => {
            return {
                ...params,
                id: 'proofsOverviewList',
                link: {
                    to: {
                        name: RouterNames.MISSING_VACCINATION
                    }
                },
                next: {
                    name: RouterNames.RECOVERY_OVERVIEW
                }
            }
        }
    },
    {
        path: '/jouw-vaccinaties-overzicht',
        component: VaccinationOverview,
        name: RouterNames.VACCINATION_OVERVIEW
    },
    {
        path: '/recovery-overzicht',
        name: RouterNames.RECOVERY_OVERVIEW,
        component: RecoveryOverview,
        props: true
    },
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
        redirect: () => {
            return { name: RouterNames.VACCINATION_OVERVIEW_LIST }
        }
    },
    {
        path: '/scannen-met-camera',
        name: RouterNames.CAMERA,
        component: QRScannerPage,
        props: {
            accepted: {
                name: RouterNames.LETTER_COMBINATION_VALIDATION
            },
            rejected: {
                name: RouterNames.LETTER_COMBINATION_INVALID
            }
        }
    },
    {
        path: '/bestand-uploaden',
        name: RouterNames.FILE,
        component: QRFromImageOrPDFPage,
        props: {
            accepted: {
                name: RouterNames.LETTER_COMBINATION_VALIDATION
            },
            rejected: {
                name: RouterNames.LETTER_COMBINATION_INVALID
            }
        }
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
        path: '/geen-geldige-lettercombinatie',
        name: RouterNames.LETTER_COMBINATION_INVALID,
        props: {
            link: {
                to: {
                    name: RouterNames.SCANNER_COMPLETE
                }
            },
            next: {
                name: RouterNames.CHOOSE_ADD_PROOF
            }
        },
        component: QRLetterCombinationInvalidPage
    },
    {
        path: '/lettercombinatie-valideren',
        name: RouterNames.LETTER_COMBINATION_VALIDATION,
        props: {
            accepted: {
                name: RouterNames.SCANNER_COMPLETE
            },
            rejected: {
                name: RouterNames.LETTER_COMBINATION_INVALID
            }
        },
        component: QRLetterCombinationValidationPage
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
            },
            next: {
                name: RouterNames.PROOF_INTRODUCTION
            }
        },
        component: QRLetterCombinationPage
    }
]

export default routes
