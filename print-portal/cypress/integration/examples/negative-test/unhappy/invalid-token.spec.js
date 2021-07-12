import { token } from '../../../../data/bsn';
import dictionary from '/src/data/language/dictionary';

context('Happy: Negative Test', () => {
    it('Commercial Flow Invalid', () => {
        cy.otherLocation(token.invalid)
        cy.get('p.ErrorLabel').should('exist')
        cy.get('p.ErrorLabel').contains(dictionary.nl.views.provideCode.invalidTestCode);
    })
})
