import { token } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Side Flow | Negative Test: something is wrong', () => {
    it('Commercial Flow', () => {
        cy.tokenFlow(token.valid)
    })

    it('Gives directions what to do when something is wrong with test result', () => {
        cy.get('#something-is-wrong').click();
        cy.modalShouldSay(dictionary.nl.message.info.somethingWrong.negativetest.head);
        cy.modalShouldClose();
    })
})
