import { bsn } from '../../../../data/bsn';

context('Happy: Vaccination', () => {
    it('Digid flow: Collect', () => {
        cy.digidFlowCollect('vaccination', bsn.fullyVaccinated);
    })

    it('Create QR', () => {
        cy.createQR('vaccination');
    })
})
