import Oidc from 'oidc-client';

var mgr = new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore(),
    authority: 'https://dev-51odbhlm.eu.auth0.com',
    client_id: '3GPG1OoyjiI94HT2uRszIaBK9041LtAt',
    redirect_uri: window.location.origin + '/nl/print/vaccination',
    response_type: 'id_token token',
    scope: 'openid profile email phone address',
    post_logout_redirect_uri: window.location.origin + '/nl/print',
    silent_redirect_uri: window.location.origin + '/nl/print/vaccination/',
    accessTokenExpiringNotificationTime: 10,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true
})

export default class SecurityService {
    signinRedirect() {
        mgr.signinRedirect().catch(function (err) {
            console.log(err)
        })
    }
}
