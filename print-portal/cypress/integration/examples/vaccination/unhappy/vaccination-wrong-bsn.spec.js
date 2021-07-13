import { bsn } from '../../../../data/bsn';
import dictionary from '/src/data/language/dictionary';

context('Unhappy: Vaccination: Wrong BSN', () => {
    it('Digid flow: Collect', () => {
        cy.digidFlowCollect('vaccination', bsn.wrongBsn);
    })

    it('Should give a 500 error', () => {
        cy.modalShouldSay(dictionary.nl.message.error.generalWithError.head);
        cy.modalShouldClose();
    })
})
