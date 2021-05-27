const data = {
    'protocolVersion': '3.0',
    'providerIdentifier': 'XXX',
    'status': 'complete', // This refers to the data-completeness, not vaccination status.
    'holder': {
        'firstName': 'Tom',
        'infix': 'van der',
        'lastName': 'Steen',
        'birthDate': '1984-03-01' // ISO 8601
    },
    'events': [
        {
            'type': 'vaccination',
            'unique': 'ee5afb32-3ef5-4fdf-94e3-e61b752dbed9',
            'isSpecimen': true,
            'vaccination': {
                'date': '2021-01-01',
                'hpkCode': '2924528', // If hpkCode is available, type/manufacturer/brand can be left blank.
                'type': '1119349007',
                'manufacturer': 'ORG-100030215',
                'brand': 'EU/1/20/1507',
                'completedByMedicalStatement': false, // Optional
                'country': 'NLD', // optional iso 3166 3-letter country field, will be set to NLD if left out. Can be used if shot was administered abroad
                'doseNumber': 1, // optional, will be based on business rules / brand info if left out
                'totalDoses': 2 // optional, will be based on business rules / brand info if left out
            }
        }, {
            'type': 'vaccination',
            'unique': 'ee5afb32-3ef5-4fdf-94e3-e61b752dbedx',
            'isSpecimen': true,
            'vaccination': {
                'date': '2021-03-01',
                'hpkCode': '2924528', // If hpkCode is available, type/manufacturer/brand can be left blank.
                'type': '1119349007',
                'manufacturer': 'ORG-100030215',
                'brand': 'EU/1/20/1507',
                'completedByMedicalStatement': false, // Optional
                'country': 'NLD', // optional iso 3166 3-letter country field, will be set to NLD if left out. Can be used if shot was administered abroad
                'doseNumber': 2, // optional, will be based on business rules / brand info if left out
                'totalDoses': 2 // optional, will be based on business rules / brand info if left out
            }
        }, {
            'type': 'negativetest',
            'unique': 'ee5afb32-3ef5-4fdf-94e3-e61b752dbed7',
            'isSpecimen': true,
            'negativetest': {
                'sampleDate': '2021-01-01T10:00:00Z',
                'resultDate': '2021-01-02T10:00:00Z',
                'negativeResult': true,
                'facility': 'GGD XL Amsterdam',
                'type': 'LP6464-4',
                'name': '???',
                'manufacturer': '1232'
            }
        }
    ]
}

export default data;
