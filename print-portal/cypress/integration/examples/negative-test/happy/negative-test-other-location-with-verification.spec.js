import { token } from '../../../../data/bsn';

context('Happy | Negative Test: Token + Verification', () => {
    it('Commercial Flow', () => {
        cy.otherLocation(token.validV2WithVerification)
    })

    it('Create QR', () => {
        cy.createQR('negative-test');
    })
})
