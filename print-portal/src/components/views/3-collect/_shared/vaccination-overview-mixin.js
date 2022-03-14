import { ProviderTypes } from '@/types/provider-types'
import dateTool from '@/tools/date';
import { FilterTypes } from '@/types/filter-types'

export default {
    computed: {
        signedVaccinations() {
            // for vaccination we put double data in one set
            const signedEvents = this.$store.getters['signedEvents/getProofEvents'](FilterTypes.VACCINATION);
            const uniqueSignedEventSets = [];

            const isTheSameEvent = (a, b) => {
                const vaccinationA = a.event.vaccination;
                const vaccinationB = b.event.vaccination;

                const isOnSameDay = (a, b) => {
                    const dayInMs = 1000 * 3600 * 24;
                    return Math.abs(new Date(a.date).getTime() - new Date(b.date).getTime()) < dayInMs;
                }

                const isSameHpkCode = (a, b) => {
                    return a.hpkCode.length > 0 && a.hpkCode === b.hpkCode;
                }

                const isSameManufacturer = (a, b) => {
                    return a.manufacturer.length > 0 && a.manufacturer === b.manufacturer;
                }

                return isOnSameDay(vaccinationA, vaccinationB) &&
                    (isSameHpkCode(vaccinationA, vaccinationB) || isSameManufacturer(vaccinationA, vaccinationB))
            }

            const getMatch = (signedEvent) => {
                for (const set of uniqueSignedEventSets) {
                    for (const item of set) {
                        if (isTheSameEvent(signedEvent, item)) {
                            return set;
                        }
                    }
                }
                return null;
            }

            for (const signedEvent of signedEvents) {
                const match = getMatch(signedEvent);
                if (!match) {
                    // create an empty set
                    uniqueSignedEventSets.push([signedEvent])
                } else {
                    // we want GGD to be the first
                    if (signedEvent.providerIdentifier === ProviderTypes.GGD) {
                        match.unshift(signedEvent)
                    } else {
                        match.push(signedEvent)
                    }
                }
            }
            return uniqueSignedEventSets.sort((a, b) => {
                return dateTool.getTime(a[0].event[a[0].event.type].date) - dateTool.getTime(b[0].event[b[0].event.type].date);
            })
        }
    }
}
