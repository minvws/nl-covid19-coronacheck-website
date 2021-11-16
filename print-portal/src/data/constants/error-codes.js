// see https://github.com/minvws/nl-covid19-coronacheck-app-coordination/blob/main/docs/Error%20Handling.md

const System = {
    ANDROID: 'A',
    IOS: 'i',
    WEB: 'W'
}

const Flow = {
    LAUNCH_STARTUP: 0,
    COMMERCIAL_TEST: 1,
    VACCINATION: 2,
    RECOVERY: 3,
    DIGID: 4,
    HKVI: 5,
    QR: 6,
    UPGRADE_EU_VACCINATION: 7,
    UNKNOWN: -1
}

const Step = {
    TVS_DIGID: 10,
    EVENT_PROVIDERS: 20,
    ACCESS_TOKENS: 30,
    UNOMI: 40,
    EVENT: 50,
    STORING: 60,
    PREPARE_ISSUE: 70,
    REFRESH_TRIPPEN: 75,
    SIGNER: 80,
    STORING_CREDENTIALS: 90
}

const Client = {
    CONNECTION: 0,
    SSL: 1,
    CMS: 2,
    JSON: 3,
    DATA_VALIDATION: 4
}

const DigiDFlows = [Flow.VACCINATION, Flow.RECOVERY, Flow.DIGID]

const isDigiDFlowError = ({ flow }) => {
    const code = flowCodeTransformer(flow)
    return DigiDFlows.includes(code)
}

const isDigiDStepError = ({ step }) => {
    return `${step}` === `${Step.DIGID}`
}

export const flowCodeTransformer = (flow = '') => {
    switch (flow) {
    case 'onboarding':
    case 'startup':
        return Flow.LAUNCH_STARTUP
    case 'commercial_test':
        return Flow.COMMERCIAL_TEST;
    case 'vaccination':
        return Flow.VACCINATION;
    case 'positivetest,recovery':
    case 'positivetest':
    case 'recovery':
        return Flow.RECOVERY;
    case 'negativetest':
        return Flow.DIGID;
    default:
        return Flow.UNKNOWN
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
    return `${System.WEB} ${flow}${step} ${provider} ${errorCode} ${errorBody}`
}
