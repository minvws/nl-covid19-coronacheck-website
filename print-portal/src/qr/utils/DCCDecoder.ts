import * as base45 from 'base45'
import * as cbor from 'cbor'
import * as pako from 'pako'

type DCC = {
    nam: {
        gn: string;
        fn: string;
    },
    dob: string;
    t?: {
        ci?: string,
        tr?: string;
        sc?: string;
        tc?: string;
        tt?: string;
        nm?: string;
        ma?: string;
    }[]
    v?: {
        ci?: string,
        dn?: string,
        sd?: string;
        dt?: string;
        co?: string;
        vp?: string;
        mp?: string;
        ma?: string;
    }[],
    r?: {
        ci?: string,
        fr?: string,
        df?: string,
        du?: string,
    }[]
}

const formatSampleDate = (dateString: string) => {
    const date = new Date(dateString)
    const time = date.getTime()
    const offset = date.getTimezoneOffset() * 60 * 1000
    return `${new Date(time + offset).toISOString().split('.')[0]}Z`
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const time = date.getTime()
    const offset = date.getTimezoneOffset() * 60 * 1000
    return `${new Date(time + offset).toISOString().split('T')[0]}`
}

const getHolderFromDCC = (dcc: DCC) => {
    return {
        infix: '',
        firstName: dcc.nam?.gn,
        lastName: dcc.nam?.fn,
        birthDate: dcc?.dob
    }
}

const getEvents = (dcc: DCC) => {
    return getRemoteVaccinationFromDcc(dcc) || getRemoteRecoveryFromDcc(dcc) || getRemoteTestFromDcc(dcc)
}

export const decodeQRtoDCC = (qr: string) => {
    // inspiration from https://gist.github.com/lmillucci/48804b0598553689fc5054da10e63231
    const encoded = qr.substring(4)
    const decoded = base45.decode(encoded)
    const output = pako.inflate(decoded);
    const [result] = cbor.decodeAllSync(output);
    const data = cbor.decodeAllSync(result?.value?.[2])?.[0];
    const dcc = data.get(-260).get(1)
    return {
        dcc,
        result: {
            holder: getHolderFromDCC(dcc),
            events: getEvents(dcc)
        }
    }
}

const getRemoteTestFromDcc = (dcc: DCC) => {
    if (!dcc.t) return undefined;
    return dcc.t.map((t) => ({
        type: 'test',
        unique: t.ci ?? null,
        isSpecimen: false,
        negativetest: {
            sampleDate: t?.sc ? formatSampleDate(t.sc) : null,
            negativeResult: t?.tr === '260415000',
            facility: t.tc ?? null,
            type: t.tt ?? null,
            name: t.nm ?? false,
            manufacturer: t.ma ?? false
        }
    }));
}

const getRemoteVaccinationFromDcc = (dcc: DCC) => {
    if (!dcc.v) return undefined;
    return dcc.v.map((v) => ({
        type: 'vaccination',
        unique: v?.ci ?? null,
        vaccination: {
            doseNumber: v?.dn ?? null,
            totalDoses: v?.sd ?? null,
            date: v?.dt ? formatDate(v.dt) : null,
            country: v?.co ?? null,
            type: v?.vp ?? null,
            brand: v?.mp ?? null,
            manufacturer: v?.ma ?? null,
            completedByMedicalStatement: null,
            hpkCode: null,
            completedByPersonalStatement: null,
            completionReason: null
        }
    }))
}

const getRemoteRecoveryFromDcc = (dcc: DCC) => {
    if (!dcc.r) return undefined;
    return dcc.r.map((r) => ({
        type: 'recovery',
        unique: r?.ci ?? null,
        isSpecimen: false,
        recovery: {
            sampleDate: r?.fr ? formatDate(r.fr) : null,
            validFrom: r?.df ? formatDate(r.df) : null,
            validUntil: r?.du ? formatDate(r.du) : null
        }
    }))
}