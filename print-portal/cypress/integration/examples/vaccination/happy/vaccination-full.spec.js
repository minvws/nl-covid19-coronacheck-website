import { bsn } from '/cypress/not-public/use-cases';

context('Happy: Vaccination', () => {
    it('Digid flow: Collect', () => {
        cy.digidFlowCollect('vaccination', bsn.fullyVaccinated);
    })

    it('Create QR', () => {
        cy.createQR('vaccination');
    })
})
