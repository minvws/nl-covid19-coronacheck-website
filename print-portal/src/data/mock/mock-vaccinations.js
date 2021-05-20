const mockVaccinationEvens = {
    'protocolVersion': '3.0',
    'providerIdentifier': 'XXX',
    'status': 'complete', // This refers to the data-completeness, not vaccination status.
    'holder': {
        'firstName': '',
        'infix': '',
        'lastName': '',
        'birthDate': '1970-01-01' // ISO 8601
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
        }
    ]
}

export default mockVaccinationEvens;
