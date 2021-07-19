import { token } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Side Flow | Negative Test: v2 info', () => {
    it('Commercial Flow', () => {
        cy.tokenFlow(token.valid)
    })

    it('Gives info about the test result', () => {
        cy.get('.info-button').click();
        cy.modalShouldSay(dictionary.nl.message.info.testResultAbout.head);
        // todo check for properties of v2
        cy.modalShouldClose();
    })
})
