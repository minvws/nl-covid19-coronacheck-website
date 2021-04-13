import { shallowMount } from '@vue/test-utils'
import dateTool from '@/tools/date.js'

describe('Date tool', () => {
    it('Standard formatting of a date', () => {
        const dateString = '2020-04-01 12:05';
        const dateStringExpected = '01-04-2020 12:05';
        expect(dateTool.dateToString(dateString)).toMatch(dateStringExpected)
    })

    it('Formatting of a date used for a testresult', () => {
        const dateString = '2021-04-13 08:00';
        const dateStringExpected = 'dinsdag 13 april 08:00';
        expect(dateTool.dateToString(dateString, 'EEEE d LLLL hh:mm')).toMatch(dateStringExpected)
    })

    it('Date 40 hours later', () => {
        const dateString = '2021-04-13 08:05';
        const dateStringExpected = '15-04-2021 00:05';
        expect(dateTool.addHoursToDate(dateString, 40, true)).toMatch(dateStringExpected)
    })
})
