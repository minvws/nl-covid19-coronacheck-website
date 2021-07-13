import { token } from '../../../../data/bsn';

context('Happy | Negative Test: Token', () => {
    it('Commercial Flow', () => {
        cy.tokenFlow(token.valid)
    })

    it('Create QR', () => {
        cy.createQR('negative-test');
    })
})
