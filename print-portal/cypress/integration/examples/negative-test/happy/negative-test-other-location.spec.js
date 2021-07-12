import { token } from '../../../../data/bsn';

context('Happy: Negative Test', () => {
    it('Commercial Flow', () => {
        cy.otherLocation(token.valid)
    })

    it('Create QR', () => {
        cy.createQR('negative-test');
    })
})
