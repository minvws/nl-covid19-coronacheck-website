import { RouteConfig } from 'vue-router'
import QRGeneralPage from '@/qr/pages/QRGeneralPage.vue'
import QRScannerPage from '@/qr/pages/QRScannerPage.vue'
import QRFromImageOrPDFPage from '@/qr/pages/QRFromImageOrPDFPage.vue'
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
    CHOOSE_ADD_PROOF = 'chooseAddProofQR',
    CAMERA = 'cameraQR',
    FILE = 'uploadFileQR',
    PROOF_DOMESTIC = 'proofDomestic',
    PROOF_INTERNATIONAL = 'chooseInternationalQR',
    PROOF_NONE = 'chooseNoneQR',
    PROOF_INTRODUCTION = 'proofIntroduction',
    LETTER_COMBINATION = 'letterCombination',
    LETTER_COMBINATION_VALIDATION = 'letterCombinationValidation',
    LETTER_COMBINATION_INVALID = 'letterCombinationInvalid',
    LETTER_COMBINATION_BLOCKED = 'letterCombinationBlocked',
    LETTER_COMBINATION_EXPIRED = 'letterCombinationExpired',
    NO_LETTER_COMBINATION = 'noLetterCombination',
    SCANNER_COMPLETE = 'scannerComplete',
    VACCINATION_OVERVIEW = 'vaccinationOverview',
    VACCINATION_OVERVIEW_LIST = 'vaccinationOverviewList',
    RECOVERY_OVERVIEW = 'recoveryOverview',
    RECOVERY_OVERVIEW_LIST = 'recoveryOverviewList',
    PROOFS_OVERVIEW_LIST = 'proofsOverviewList',
    NO_QR_CODE_FOUND = 'noQRCodeFound',
    ERROR_QR_INVALID = 'errorQRInvalid',
    ERROR_QR_DOMESTIC = 'errorQRDomestic',
    ERROR_QR_INVALID_TYPE = 'errorQRInvalidType',
    ERROR_QR_DUPLICATE = 'errorQRDuplicate',
    ERROR_QR_MISMATCH = 'errorQRMismatch'

}
const routes: Array<RouteConfig> = [
    {
        path: '/jouw-vaccinaties',
        component: ProofsOverviewList,
        name: RouterNames.VACCINATION_OVERVIEW_LIST,
        meta: {
            title: `views.${RouterNames.PROOFS_OVERVIEW_LIST}.pageHeader`
        },
        props: ({ params }) => {
            return {
                ...params,
                id: RouterNames.PROOFS_OVERVIEW_LIST,
                link: {
                    to: {
                        name: RouterNames.PROOF_INTRODUCTION
                    }
                },
                next: {
                    name: RouterNames.VACCINATION_OVERVIEW
                }
            }
        }
    },
    {
        path: '/jouw-bewijzen',
        name: RouterNames.RECOVERY_OVERVIEW_LIST,
        component: ProofsOverviewList,
        meta: {
            title: `views.${RouterNames.PROOFS_OVERVIEW_LIST}.pageHeader`
        },
        props: ({ params }) => {
            return {
                ...params,
                id: RouterNames.PROOFS_OVERVIEW_LIST,
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
                    icon: require('@/qr/assets/icons/camera.svg'),
                    replace: true
                },
                {
                    name: RouterNames.FILE,
                    ...(i18n.t('qr.file.route') as Record<string, unknown>),
                    icon: require('@/qr/assets/icons/upload.svg'),
                    replace: true
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
                replace: true,
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
            return { name: RouterNames.VACCINATION_OVERVIEW_LIST, replace: true }
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
        path: '/bestand-toevoegen',
        name: RouterNames.FILE,
        component: QRFromImageOrPDFPage,
        props: {
            accepted: {
                name: RouterNames.LETTER_COMBINATION_VALIDATION
            },
            validation: {
                name: RouterNames.LETTER_COMBINATION
            },
            rejected: {
                name: RouterNames.LETTER_COMBINATION_INVALID
            }
        }
    },
    {
        path: '/missende-vaccinatie-toevoegen',
        name: RouterNames.PROOF_INTRODUCTION,
        props: {
            next: {
                to: {
                    name: RouterNames.CHOOSE_ADD_PROOF,
                    replace: true
                }
            },
            link: {
                to: {
                    name: RouterNames.PROOF_NONE
                }
            }
        },
        component: QRProofIntroductionPage
    },
    {
        path: '/lettercombinatie-geblokkeerd',
        name: RouterNames.LETTER_COMBINATION_BLOCKED,
        props: {
            link: {
                to: {
                    name: RouterNames.SCANNER_COMPLETE
                }
            }
        },
        component: QRLetterCombinationInvalidPage
    },
    {
        path: '/lettercombinatie-verlopen',
        name: RouterNames.LETTER_COMBINATION_EXPIRED,
        props: {
            link: {
                to: {
                    name: RouterNames.SCANNER_COMPLETE
                }
            }
        },
        component: QRLetterCombinationInvalidPage
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
                name: RouterNames.LETTER_COMBINATION
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
            },
            blocked: {
                name: RouterNames.LETTER_COMBINATION_BLOCKED
            },
            expired: {
                name: RouterNames.LETTER_COMBINATION_EXPIRED
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
        path: '/geen-qr-code-gevonden',
        name: RouterNames.NO_QR_CODE_FOUND,
        props: {
            link: {
                to: {
                    name: RouterNames.CAMERA,
                    replace: true
                }
            },
            next: {
                name: RouterNames.FILE,
                replace: true
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/qr-code-wordt-niet-herkend',
        name: RouterNames.ERROR_QR_INVALID,
        props: {
            next: {
                name: RouterNames.FILE,
                replace: true
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/voeg-je-internationale-qr-code-toe',
        name: RouterNames.ERROR_QR_DOMESTIC,
        props: {
            next: {
                name: RouterNames.FILE,
                replace: true
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/voeg-je-vaccinatie-bewijs-toe',
        name: RouterNames.ERROR_QR_INVALID_TYPE,
        props: {
            next: {
                name: RouterNames.FILE,
                replace: true
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/deze-qr-code-heb-je-al-toegevoegd',
        name: RouterNames.ERROR_QR_DUPLICATE,
        props: {
            next: {
                name: RouterNames.FILE,
                replace: true
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/de-persoonsgegevens-zijn-niet-hetzelfde',
        name: RouterNames.ERROR_QR_MISMATCH,
        props: {
            link: {
                to: {
                    name: RouterNames.SCANNER_COMPLETE
                }
            },
            next: {
                name: RouterNames.FILE,
                replace: true
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
                name: RouterNames.LETTER_COMBINATION_VALIDATION,
                replace: true
            }
        },
        component: QRLetterCombinationPage
    }
]

export default routes
