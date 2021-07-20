import { bsn } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Happy | Negative Test: Proofs both', () => {
    it('Digid flow: Negative Test', () => {
        cy.digidFlowCollect('negative-test', bsn.negativeTest);
    })

    it('Proofs: both', () => {
        cy.goToPrint('negative-test');
        cy.pageHeaderShouldContain(dictionary.nl.views.printNegativeTest.both.pageHeader);
    })
})
