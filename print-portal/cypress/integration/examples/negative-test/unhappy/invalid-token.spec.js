import { token } from '../../../../data/bsn';
import dictionary from '/src/data/language/dictionary';

context('Unhappy | Negative Test: Invalid token', () => {
    it('Commercial Flow Invalid', () => {
        cy.tokenFlow(token.invalid)
        cy.get('p.ErrorLabel').should('exist')
        cy.get('p.ErrorLabel').contains(dictionary.nl.views.provideCode.invalidTestCode);
    })
})
