import { token } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Unhappy | Negative Test: 429', () => {
    it('Commercial Flow Pending', () => {
        cy.tokenFlow(token.four29)
    })

    it('Should lead to the error page', () => {
        cy.pageHeaderShouldContain(dictionary.nl.views.testResultSomethingWrong.pageHeader);
        cy.pageIntroShouldContain('429');
    })
})
