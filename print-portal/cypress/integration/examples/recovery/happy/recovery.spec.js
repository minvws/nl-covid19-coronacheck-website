import { bsn } from '/cypress/not-public/use-cases';

context('Happy | Recovery: DigiD', () => {
    it('Digid flow: Recovery', () => {
        cy.digidFlowCollect('recovery', bsn.recovery);
    })

    it('Create QR', () => {
        cy.createQR('recovery');
    })
})
