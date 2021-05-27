import numberTools from '@/tools/numbers'

// todo add tests for this method
export const negativeTestConversionV2ToV3 = (negativeTestDataV2) => {
    const birthDay = numberTools.getLeadingZero(negativeTestDataV2.holder.birthDay)
    const birthMonth = numberTools.getLeadingZero(negativeTestDataV2.holder.birthMonth)
    return {
        'protocolVersion': '3.0 (converted from 2.0)',
        'providerIdentifier': '',
        'status': '',
        'holder': {
            'firstName': negativeTestDataV2.holder.firstNameInitial,
            'infix': '',
            'lastName': negativeTestDataV2.holder.lastNameInitial,
            'birthDate': ('1900-' + birthDay + '-' + birthMonth)
        },
        'events': [
            {
                'type': 'negativetest',
                'unique': negativeTestDataV2.unique,
                'isSpecimen': negativeTestDataV2.isSpecimen,
                'negativetest': {
                    'sampleDate': negativeTestDataV2.sampleDate,
                    'resultDate': '',
                    'negativeResult': negativeTestDataV2.negativeResult,
                    'facility': '',
                    'type': '', // we do know negativeTestDataV2.testType, but this is another format ?
                    'name': '',
                    'manufacturer': ''
                }
            }
        ]
    }
}
