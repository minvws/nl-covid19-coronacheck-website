import { bsn } from '../../../../data/bsn';

context('Happy: Negative Test', () => {
    it('Commercial Flow', () => {
        cy.init('negative-test');
        cy.get('#other-location-negative-test').click();
        cy.wait(500);
        cy.get('#input--testCode').clear();
        cy.get('#input--testCode').type(bsn.negativeTestToken);
        cy.wait(500);
        cy.get('#submit-test-code').click();
        cy.wait(500);
    })

    it('Create QR', () => {
        cy.createQR('negative-test');
    })
})
