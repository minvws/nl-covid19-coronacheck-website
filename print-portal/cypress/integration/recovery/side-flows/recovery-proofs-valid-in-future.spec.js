import { bsn } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Side Flow | Recovery: Proof valid in future', () => {
    it('Digid flow: Recovery', () => {
        cy.digidFlowCollect('recovery', bsn.recoveryInFuture);
    })

    it('Proofs: valid in future page', () => {
        cy.goToPrint('recovery');
        // cy.pageIntroShouldContain(dictionary.nl.views.printRecovery.validInFuture.pageIntro);
        cy.pageIntroShouldContain('Je herstelbewijs wordt 11 dagen na de posititieve testuitslag geldig.');
    })
})
