import { bsn } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Unhappy: Recovery: None', () => {
    it('Digid flow: Collect', () => {
        cy.digidFlowCollect('recovery', bsn.recoveryNone);
    })

    it('Should lead to the none recovery page', () => {
        cy.pageHeaderShouldContain(dictionary.nl.views.recoveryNone.pageHeader);
    })
})
