// see https://github.com/minvws/nl-covid19-coronacheck-app-coordination/blob/main/docs/Error%20Handling.md
import { FlowTypes } from '@/types/flow-types'
import { StepTypes } from '@/types/step-types'

const SystemCode = {
    ANDROID: 'A',
    IOS: 'i',
    WEB: 'W'
}

const FlowCode = {
    LAUNCH_STARTUP: '0',
    COMMERCIAL_TEST: '1',
    VACCINATION: '2',
    RECOVERY: '3',
    DIGID: '4',
    HKVI: '5',
    QR: '6',
    UPGRADE_EU_VACCINATION: '7',
    UNKNOWN: '-1'
}

export const ClientCode = {
    UNKNOWN: '-1',
    CONNECTION: {
        UNABLE_TO_CONNECT: '001',
        INVALID_HOSTNAME: '002',
        INVALID_RESPONSE: '003',
        TIMED_OUT: '004',
        CONNECTION_LOST: '005'
    },
    SSL: '1',
    CMS: {
        INVALID_SIGNATURE: '020'
    },
    JSON: {
        DECODE_ERROR: '030',
        ENCODE_ERROR: '031'
    },
    DATA_VALIDATION: {
        MALFORMATED_JSON: '040',
        REQUIRED_FIELD_MISSING: '041'
    }
}

const DigiDFlows = [FlowCode.VACCINATION, FlowCode.RECOVERY, FlowCode.DIGID]

const isDigiDFlowError = ({ flow }) => {
    const code = flowCodeTransformer(flow)
    return DigiDFlows.includes(code)
}

const isDigiDStepError = ({ step }) => {
    return step === StepTypes.DIGID
}

export const flowCodeTransformer = (flow = '') => {
    switch (flow) {
    case FlowTypes.ONBOARDING:
    case FlowTypes.STARTUP:
        return FlowCode.LAUNCH_STARTUP
    case FlowTypes.COMMERCIAL_TEST:
        return FlowCode.COMMERCIAL_TEST;
    case FlowTypes.VACCINATION:
        return FlowCode.VACCINATION;
    case [FlowTypes.POSITIVE_TEST, FlowTypes.RECOVERY].join(','):
    case FlowTypes.POSITIVE_TEST:
    case FlowTypes.RECOVERY:
        return FlowCode.RECOVERY;
    case FlowTypes.NEGATIVE_TEST:
        return FlowCode.DIGID;
    default:
        return FlowCode.UNKNOWN
    }
}

export const isDigiDFlowAndStepError = (payload) => {
    return isDigiDFlowError(payload) && isDigiDStepError(payload)
}

export const errorCodeTransformer = ({
    flow,
    step,
    provider,
    errorCode,
    errorBody
}) => {
    // s xyy ppp? hhh bbbbbb (system flow.step provider errorcode detailederrorcode)
    return `${SystemCode.WEB} ${flowCodeTransformer(flow)}${step} ${provider} ${errorCode} ${errorBody}`
}

export const getClientSideErrorCode = (code = '') => {
    switch (code.toUpperCase()) {
    case 'NETWORK ERROR':
        return ClientCode.CONNECTION.INVALID_HOSTNAME;
    case 'ECONNABORTED':
        return ClientCode.CONNECTION.UNABLE_TO_CONNECT;
    default:
        return ClientCode.UNKNOWN;
    }
}
