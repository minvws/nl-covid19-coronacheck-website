import { bsn } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Happy | Negative Test: Proofs european', () => {
    it('Digid flow: Negative Test', () => {
        cy.digidFlowCollect('negative-test', bsn.negativeTestSpeedTest);
    })

    it('Proofs: european', () => {
        cy.goToPrint('negative-test');
        cy.pageShouldSay(dictionary.nl.views.printNegativeTest.european.pageHeader);
    })
})
