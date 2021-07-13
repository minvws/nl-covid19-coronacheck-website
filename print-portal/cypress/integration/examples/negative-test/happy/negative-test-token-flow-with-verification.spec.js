import { token } from '../../../../data/bsn';

context('Happy | Negative Test: Token + Verification', () => {
    it('Commercial Flow', () => {
        cy.tokenFlow(token.validV2WithVerification)
    })

    it('Create QR', () => {
        cy.createQR('negative-test');
    })
})
