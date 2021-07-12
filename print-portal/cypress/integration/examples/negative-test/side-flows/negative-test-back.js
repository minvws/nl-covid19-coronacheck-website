import { token } from '../../../../data/bsn';
import dictionary from '/src/data/language/dictionary';

context('Side Flow: Negative Test, go back', () => {
    it('Commercial Flow', () => {
        cy.otherLocation(token.valid)
    })

    it('Should warn when wants to go back', () => {
        cy.get('.Navigation__back').click();
        cy.modalShouldSay(dictionary.nl.message.info.areYouSureToCancel.head);
    })

    it('The yes option should be red', () => {
        cy.get('#modal-confirm').should('exist')
        cy.get('#modal-confirm').contains(dictionary.nl.message.info.areYouSureToCancel.yes)
        cy.get('#modal-confirm').should('have.css', 'color')
            .and('eq', 'rgb(179, 9, 0)')
    })

    it('Going back should lead to choice page', () => {
        // todo
    })
})
