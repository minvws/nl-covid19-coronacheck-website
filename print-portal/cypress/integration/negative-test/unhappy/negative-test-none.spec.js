import { bsn } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Unhappy: Negative Test: None', () => {
    it('Digid flow: Collect', () => {
        cy.digidFlowCollect('negative-test', bsn.negativeTestNone);
    })

    it('Should lead to the none negative test page', () => {
        cy.pageShouldSay(dictionary.nl.views.testResultNone.pageHeader);
    })
})
