import Oidc from 'oidc-client';

// todo redirect uri's should handle language

const optionsTest = {
    userStore: new Oidc.WebStorageStateStore(),
    authority: 'https://dev-51odbhlm.eu.auth0.com',
    client_id: '3GPG1OoyjiI94HT2uRszIaBK9041LtAt',
    response_type: 'code'
}

// const optionsTVS = {
//     userStore: new Oidc.WebStorageStateStore(),
//     authority: 'https://tvs-connect.acc.coronacheck.nl',
//     client_id: 'test_client',
//     response_type: 'code'
// }

const mgrVaccination = new Oidc.UserManager({
    ...optionsTest,
    redirect_uri: window.location.origin + '/nl/print/jouw-vaccinaties-redirect'
})

const mgrNegativeTest = new Oidc.UserManager({
    ...optionsTest,
    redirect_uri: window.location.origin + '/nl/print/jouw-testresultaat-redirect'
})

export default class SecurityService {
    getVaccinations() {
        mgrVaccination.signinRedirect().catch(function (err) {
            console.log(err)
        })
    }

    getNegativeTests() {
        mgrNegativeTest.signinRedirect().catch(function (err) {
            console.log(err)
        })
    }
}
