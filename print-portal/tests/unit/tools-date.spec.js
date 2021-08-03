import { shallowMount } from '@vue/test-utils'
import dateTool from '@/tools/date.js'

describe('Date tool', () => {
    it('Standard formatting of a date', () => {
        const dateString = '2020-04-01 12:05';
        const dateStringExpected = '01-04-2020 12:05';
        expect(dateTool.dateToString(dateString)).toMatch(dateStringExpected)
    })

    it('Formatting of a date used for a testresult without language setting', () => {
        const dateString = '2021-04-13 14:00';
        const dateStringExpected = 'dinsdag 13 april 14:00';
        expect(dateTool.dateToString(dateString, 'datetime-with-day')).toMatch(dateStringExpected)
    })

    it('Formatting of a date used for a testresult, english', () => {
        const dateString = '2021-04-13 14:00';
        const dateStringExpected = 'Tuesday 13 April 14:00';
        expect(dateTool.dateToString(dateString, 'datetime-with-day', 'en')).toMatch(dateStringExpected)
    })
})
