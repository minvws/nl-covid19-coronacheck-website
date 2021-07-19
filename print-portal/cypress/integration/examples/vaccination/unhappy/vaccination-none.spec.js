import { bsn } from '/cypress/not-public/use-cases';
import dictionary from '/src/data/language/dictionary';

context('Unhappy: Vaccination: None', () => {
    it('Digid flow: Collect', () => {
        cy.digidFlowCollect('vaccination', bsn.vaccinationNone);
    })

    it('Should lead to the none vaccination page', () => {
        cy.pageShouldSay(dictionary.nl.views.noVaccinations.pageHeader);
    })
})
