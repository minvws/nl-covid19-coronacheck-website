import { token } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Unhappy | Negative Test: Pending', () => {
    it('Commercial Flow Pending', () => {
        cy.tokenFlow(token.pending)
    })

    it('Should lead to the pending page', () => {
        cy.pageShouldSay(dictionary.nl.views.testResultPending.pageHeader);
    })
})
