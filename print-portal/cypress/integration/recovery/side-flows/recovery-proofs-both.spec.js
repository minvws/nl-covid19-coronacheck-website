import { bsn } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Side Flow | Recovery: Proofs both', () => {
    it('Digid flow: Recovery', () => {
        cy.digidFlowCollect('recovery', bsn.recovery);
    })

    it('Proofs: both', () => {
        cy.goToPrint('recovery');
        cy.pageHeaderShouldContain(dictionary.nl.views.printRecovery.both.pageHeader);
    })
})
