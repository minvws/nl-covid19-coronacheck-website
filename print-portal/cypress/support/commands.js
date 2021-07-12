import { settings } from './settings';

Cypress.Commands.add('init', (type) => {
    cy.wait(500);
    cy.visit(settings.url)
    cy.wait(500);
    cy.get('input#user-consent').check();
    cy.get('.btn').click();

    cy.wait(500);
    cy.get('#proof-choice-' + type).click();
    cy.wait(500);
})

Cypress.Commands.add('digidFlowCollect', (type, bsn) => {
    cy.init(type);
    cy.get('#digid-' + type).click();

    cy.wait(500);
    cy.get('#bsn_inp').clear();
    cy.get('#bsn_inp').type(bsn);
    cy.get('#submit_two').click();
    cy.wait(1000);
})

Cypress.Commands.add('createQR', (type) => {
    // wait a little longer for collecting
    cy.wait(2000);
    cy.get('#create-qr-' + type).click();

    // cy.wait(500);
    // cy.get('#open-pdf').click();
})
