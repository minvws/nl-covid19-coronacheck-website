import { bsn } from '../../../../data/bsn';

context('Happy | Recovery: DigiD', () => {
    it('Digid flow: Recovery', () => {
        cy.digidFlowCollect('recovery', bsn.recovery);
    })

    it('Create QR', () => {
        cy.createQR('recovery');
    })
})
