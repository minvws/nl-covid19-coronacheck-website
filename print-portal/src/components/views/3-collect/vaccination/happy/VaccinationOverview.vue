<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Vaccination from './Vaccination';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import dateTool from '@/tools/date';
import LoadingCover from '@/components/elements/LoadingCover';
import { FilterTypes } from '@/types/filter-types'
import { ProviderTypes } from '@/types/provider-types'

export default {
    name: 'VaccinationOverview',
    components: { LoadingCover, Page, PageIntro, Vaccination, CcButton, CcModestButton },
    mixins: [overviewMixin],
    data() {
        return {
            filter: FilterTypes.VACCINATION,
            pages: {
                print: 'PrintVaccination'
            }
        }
    },
    computed: {
        signedEventSets() {
            // for vaccination we put double data in one set
            const signedEvents = this.$store.getters['signedEvents/getProofEvents'](this.filter);
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
</script>

<template>
    <Page
        class="VaccinationOverview"
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.vaccinationOverview.pageHeader')"
                :intro="$t('views.vaccinationOverview.pageIntro')"/>
            <div class="section-block">
                <div class="proof-events">
                    <Vaccination
                        v-for="signedEventSet of signedEventSets"
                        :key="signedEventSet[0].unique"
                        :signed-event-set="signedEventSet"/>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        id="create-qr-vaccination"
                        @select="gotoPrint()"
                        :label="$t('views.vaccinationOverview.createTestProofButton')"/>
                    <div class="button__help-button">
                        <CcModestButton
                            @select="openModalSomethingWrong()"
                            :label="$t('somethingIsWrong')"/>
                    </div>
                </div>
            </div>
            <LoadingCover v-if="proofSubmitted"/>
        </div>
    </Page>
</template>
