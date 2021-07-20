import { token } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Happy | Negative Test: Proofs european', () => {
    it('Commercial Flow', () => {
        cy.tokenFlow(token.onlyEuropean)
    })

    it('Proofs: european', () => {
        cy.goToPrint('negative-test');
        cy.pageShouldSay(dictionary.nl.views.printNegativeTest.european.pageHeader);
    })
})
