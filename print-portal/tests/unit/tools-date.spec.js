import dateTool from '@/tools/date.js'

describe('Date tool', () => {
    it('Date with day NL', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = 'zondag 1 maart 2020';
        expect(dateTool.dateToString(dateString, 'date-with-day', 'nl')).toMatch(dateStringExpected)
    })

    it('Date with day EN', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = 'Sunday 1 March 2020';
        expect(dateTool.dateToString(dateString, 'date-with-day', 'en')).toMatch(dateStringExpected)
    })

    it('Date without day NL', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = '1 maart 2020';
        expect(dateTool.dateToString(dateString, 'date-without-day', 'nl')).toMatch(dateStringExpected)
    })

    it('Date without day EN', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = '1 March 2020';
        expect(dateTool.dateToString(dateString, 'date-without-day', 'en')).toMatch(dateStringExpected)
    })

    it('Datetime with day NL', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = 'zondag 1 maart 12:05';
        expect(dateTool.dateToString(dateString, 'datetime-with-day', 'nl')).toMatch(dateStringExpected)
    })

    it('Datetime with day EN', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = 'Sunday 1 March 12:05';
        expect(dateTool.dateToString(dateString, 'datetime-with-day', 'en')).toMatch(dateStringExpected)
    })

    it('Date to monthname NL', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = 'maart';
        expect(dateTool.dateToMonthName(dateString, 'nl')).toMatch(dateStringExpected)
    })

    it('Date to monthname EN', () => {
        const dateString = '2020-03-01 12:05';
        const dateStringExpected = 'March';
        expect(dateTool.dateToMonthName(dateString, 'en')).toMatch(dateStringExpected)
    })

    it('Valid string should pass', () => {
        const dateString = '2020-03-01';
        expect(dateTool.isValidDateString(dateString)).toBeTruthy()
    })

    it('Invalid string should fail', () => {
        const dateString = '2020-xx-01';
        expect(dateTool.isValidDateString(dateString)).toBeFalsy()
    })
})
