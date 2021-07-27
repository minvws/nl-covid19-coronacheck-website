import { token } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Unhappy | Negative Test: Invalid verification', () => {
    it('Commercial Flow Invalid', () => {
        cy.tokenFlow(token.invalidVerification)
        cy.get('p.error-label').should('exist')
        cy.get('p.error-label').contains(dictionary.nl.views.provideCode.invalidVerificationCode);
    })
})
