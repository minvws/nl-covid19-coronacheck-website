import { settings } from '../settings';

context('Happy: Vaccination', () => {
    it('Visits the web page', () => {
        cy.wait(500);
        cy.visit(settings.url)
    })
    it('Agrees with Privacy Statement', () => {
        cy.wait(500);
        cy.get('input#user-consent').check();
        cy.get('.btn').click();
    })
    it('Chooses vaccination', () => {
        cy.wait(500);
        cy.get('#proof-choice-vaccination').click();
    })
    it('Goes to Mock DigiD', () => {
        cy.wait(500);
        cy.get('#digid-vaccination').click();
    })
    it('Enters the BSN and submits', () => {
        cy.wait(500);
        cy.get('#bsn_inp').clear();
        cy.get('#bsn_inp').type(settings.bsn.fullyVaccinated);
        cy.get('#submit_two').click();
        cy.wait(1000);
    })
    it('Goes to vaccination print page', () => {
        // wait a little longer for collecting
        cy.wait(2000);
        cy.get('#create-qr-vaccination').click();
    })
    it('Opens the PDF', () => {
        cy.wait(500);
        cy.get('#open-pdf').click();
    })
})
