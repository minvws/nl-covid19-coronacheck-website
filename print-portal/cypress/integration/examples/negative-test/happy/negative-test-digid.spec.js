import { bsn } from '/cypress/not-public/use-cases';

context('Happy | Negative Test: DigiD', () => {
    it('Digid flow: Negative Test', () => {
        cy.digidFlowCollect('negative-test', bsn.negativeTest);
    })

    it('Create QR', () => {
        cy.createQR('negative-test');
    })
})
