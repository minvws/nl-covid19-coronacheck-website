import { decodeQRtoDCC } from '@/qr/utils/DCCDecoder'

export type Holder = {
    firstName: string;
    infix: string;
    lastName: string;
    birthDate: string;
}

export type Event = {
    holder: Holder;
    event?: unknown;
}

const getFirstCharToUpperCase = (input = '') => {
    const char = input?.[0]
    return char?.toUpperCase()
}

const isFirstCharEqual = (a: string, b: string) => {
    return getFirstCharToUpperCase(a) === getFirstCharToUpperCase(b)
}

const isNameMatch = (holder: Holder, target: Holder) => {
    return isFirstCharEqual(holder.firstName, target.firstName) ||
        isFirstCharEqual(holder.lastName, target.lastName)
}

export const getHolderFromEvents = (events: Event[]) => {
    return events.find(({ event }) => !!event)?.holder
}

const isDayAndMonthOfBirthEqual = (holder: Holder, target: Holder) => {
    const a = new Date(holder.birthDate)
    const b = new Date(target.birthDate)
    return (a.getDate() === b.getDate()) && (a.getMonth() === b.getMonth())
}

export const isHolderEqual = (qr: string, events: Event[]) => {
    const holder = getHolderFromEvents(events)
    if (!holder) return false
    const { result: { holder: target } } = decodeQRtoDCC(qr)
    return isNameMatch(holder, target) &&
        isDayAndMonthOfBirthEqual(holder, target)
}
