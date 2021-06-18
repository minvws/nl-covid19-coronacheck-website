export const errors = [
    new Error(),
    new Error('General Error')
]

export const testScenarios = [
    {
        name: 'catch all',
        collect: true
    },
    {
        name: 'catch all details',
        collect: true,
        details: true
    }, {
        name: 'too busy',
        collect: true,
        busy: true
    }, {
        name: 'too busy provider',
        collect: false,
        busy: true,
        provider: 'RVV'
    }, {
        name: 'too busy provider, no results',
        collect: false,
        busy: true,
        provider: 'ZZZ'
    }, {
        name: 'error at provider',
        collect: false,
        busy: false,
        error: true,
        provider: 'RVV'
    }, {
        name: 'error at provider',
        collect: false,
        busy: false,
        error: true,
        provider: 'ZZZ'
    }
];
