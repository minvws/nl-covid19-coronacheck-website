export const negativeTestConversionV2ToV3 = (negativeTestDataV2) => {
    return {
        'protocolVersion': '2.0',
        'events': [
            {
                'protocolVersion': '2.0',
                'type': 'negativetest',
                'unique': negativeTestDataV2.unique,
                'negativetest': negativeTestDataV2
            }
        ]
    }
}
