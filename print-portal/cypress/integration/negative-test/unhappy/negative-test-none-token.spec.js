import { token } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Unhappy | Negative Test: None from token', () => {
    it('Commercial Flow Pending', () => {
        cy.tokenFlow(token.emptyTokenResult)
    })

    it('Should lead to the none negative test page', () => {
        cy.pageHeaderShouldContain(dictionary.nl.views.testResultNone.pageHeader);
    })
})
