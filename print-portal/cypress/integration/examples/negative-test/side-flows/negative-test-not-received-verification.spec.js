import { token } from '../../../../data/bsn';
import dictionary from '/src/data/language/dictionary';

context('Side Flow | Negative Test: Not received verification', () => {
    it('Commercial Flow', () => {
        // pick a user with verification, but strip the verification
        // this way we can press the button
        const user = {
            token: token.validV2WithVerification.token
        }
        cy.tokenFlow(user);
    })

    it('Did not get a verification', () => {
        cy.get('#did-not-get-verification').click()
        cy.modalShouldSay(dictionary.nl.message.info.noVerificationCode.head);
        cy.modalShouldClose(true);
    })
})
