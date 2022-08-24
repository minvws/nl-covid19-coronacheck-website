import { RouteConfig } from 'vue-router'
import QRGeneralPage from '@/qr/pages/QRGeneralPage.vue'
import QREntryPage from '@/qr/pages/QREntryPage.vue'
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
import store from '@/store';
import i18n from '@/i18n'
import { authenticate } from '@/interfaces/auth-helper'
import { FlowTypes } from '@/types/flow-types'
import { AuthType } from '@/types/auth-types'

const goToHome = () => {
    // force a reload of the home page
    window.location.href = `/${i18n.locale}/`;
}

export enum RouterNames {
    CHOOSE_CARE_PROFIDER = 'chooseCareProvider',
    REQUEST_CERTIFICATE_DIGID = 'requestDigid',
    CHOOSE_VACCINATION_LOCATION = 'choiceVaccinationLocation',
    CHOOSE_TEST_PROFIDER = 'chooseTestProvider',
    CHOOSE_NO_DIGID = 'chooseNoDigiD',
    CHOOSE_BSN = 'chooseBSN',
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
    PROOF_ADDED_OVERVIEW_LIST = 'proofAddedOverviewList',
    NO_QR_CODE_FOUND = 'noQRCodeFound',
    ERROR_QR_INVALID = 'errorQRInvalid',
    ERROR_QR_DOMESTIC = 'errorQRDomestic',
    ERROR_QR_INVALID_TYPE = 'errorQRInvalidType',
    ERROR_QR_DUPLICATE = 'errorQRDuplicate',
    ERROR_QR_MISMATCH = 'errorQRMismatch'
}

const routes: Array<RouteConfig> = [
    {
        path: '/testuitslag-ophalen-met-digid',
        name: RouterNames.CHOOSE_TEST_PROFIDER,
        props: () => {
            return {
                link: {
                    to: {
                        name: RouterNames.CHOOSE_NO_DIGID,
                        params: {
                            flow: FlowTypes.NEGATIVE_TEST
                        }
                    }
                },
                next: {
                    icon: {
                        src: 'assets/img/digid/logo_digid_rgb.svg'
                    },
                    action: () => {
                        authenticate(FlowTypes.NEGATIVE_TEST, AuthType.MAX)
                    }
                }
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/waar-ben-je-gevaccineerd',
        name: RouterNames.CHOOSE_VACCINATION_LOCATION,
        props: () => ({
            routes: [
                {
                    ...(i18n.t('button.bsn.vaccinationLocationGGD') as Record<string, unknown>),
                    action: () => {
                        authenticate(FlowTypes.VACCINATION, AuthType.PAP)
                    }
                },
                {
                    name: RouterNames.CHOOSE_CARE_PROFIDER,
                    ...(i18n.t('button.bsn.vaccinationLocationOther') as Record<string, unknown>)
                }
            ]
        }),
        component: QRGeneralPage
    },
    {
        path: '/coronabewijs-aanvragen-helpdesk',
        name: RouterNames.REQUEST_CERTIFICATE_DIGID,
        props: {
            next: {
                action: () => {
                    goToHome()
                }
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/coronabewijs-aanvragen-zorgverlener',
        name: RouterNames.CHOOSE_CARE_PROFIDER,
        props: {
            next: {
                action: () => {
                    goToHome()
                }
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/heb-je-een-bsn',
        name: RouterNames.CHOOSE_BSN,
        props: () => {
            const flow = store.getters.flow
            return {
                routes: [
                    {
                        name: RouterNames.REQUEST_CERTIFICATE_DIGID,
                        ...(i18n.t('button.bsn.withBSN') as Record<string, unknown>)
                    },
                    (flow === FlowTypes.RECOVERY || flow === FlowTypes.NEGATIVE_TEST) && {
                        ...(i18n.t('button.bsn.noBSNWithVaccination') as Record<string, unknown>),
                        action: () => {
                            authenticate(flow, AuthType.PAP)
                        }
                    },
                    flow === FlowTypes.VACCINATION && {
                        name: RouterNames.CHOOSE_VACCINATION_LOCATION,
                        ...(i18n.t('button.bsn.noBSNWithTest') as Record<string, unknown>)
                    }
                ].filter(a => !!a)
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/ik-heb-geen-digid',
        name: RouterNames.CHOOSE_NO_DIGID,
        props: ({ params: { flow } }) => {
            if (flow) {
                store.commit('setFlow', flow);
            }
            return {
                routes: [
                    {
                        ...(i18n.t('button.digid.requestDigiD') as Record<string, unknown>),
                        icon: {
                            src: 'assets/img/digid/logo_digid_rgb.svg',
                            position: 'after'
                        }
                    },
                    {
                        name: RouterNames.CHOOSE_BSN,
                        ...(i18n.t('button.digid.noDigiD') as Record<string, unknown>)
                    }
                ]
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/jouw-vaccinaties',
        component: ProofsOverviewList,
        name: RouterNames.VACCINATION_OVERVIEW_LIST,
        meta: {
            title: `views.${RouterNames.PROOFS_OVERVIEW_LIST}.pageHeader`
        },
        props: ({ params }) => {
            return {
                id: RouterNames.PROOFS_OVERVIEW_LIST,
                ...params,
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
                        name: RouterNames.PROOF_INTRODUCTION
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
        component: QREntryPage,
        props: () => ({
            reject: {
                to: {
                    name: 'CollectVaccination'
                },
                replace: true
            },
            routes: [
                {
                    name: RouterNames.CAMERA,
                    ...(i18n.t('qr.camera.route') as Record<string, unknown>),
                    icon: {
                        src: require('@/qr/assets/icons/camera.svg'),
                        position: 'after'
                    },
                    replace: true
                },
                {
                    name: RouterNames.FILE,
                    ...(i18n.t('qr.file.route') as Record<string, unknown>),
                    icon: {
                        src: require('@/qr/assets/icons/upload.svg'),
                        position: 'after'
                    },
                    replace: true
                }
            ]
        })
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
        redirect: ({ params }) => {
            return {
                name: RouterNames.VACCINATION_OVERVIEW_LIST,
                params,
                replace: true
            }
        }
    },
    {
        path: '/scannen-met-camera',
        name: RouterNames.CAMERA,
        component: QRScannerPage,
        props: {
            validation: {
                name: RouterNames.LETTER_COMBINATION
            },
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
            validation: {
                name: RouterNames.LETTER_COMBINATION
            },
            accepted: {
                name: RouterNames.LETTER_COMBINATION_VALIDATION
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
                },
                replace: true
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
                name: RouterNames.SCANNER_COMPLETE,
                params: {
                    id: RouterNames.PROOF_ADDED_OVERVIEW_LIST
                }
            },
            validation: {
                name: RouterNames.CHOOSE_ADD_PROOF
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
                    name: RouterNames.CAMERA
                },
                replace: true
            },
            next: {
                go: -1
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/qr-code-wordt-niet-herkend',
        name: RouterNames.ERROR_QR_INVALID,
        props: {
            next: {
                go: -1
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/voeg-je-internationale-qr-code-toe',
        name: RouterNames.ERROR_QR_DOMESTIC,
        props: {
            next: {
                go: -1
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/voeg-je-vaccinatie-bewijs-toe',
        name: RouterNames.ERROR_QR_INVALID_TYPE,
        props: {
            next: {
                go: -1
            }
        },
        component: QRGeneralPage
    },
    {
        path: '/deze-qr-code-heb-je-al-toegevoegd',
        name: RouterNames.ERROR_QR_DUPLICATE,
        props: {
            next: {
                go: -1
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
                go: -1
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
