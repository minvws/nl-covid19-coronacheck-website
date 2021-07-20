import { settings } from '/cypress/not-public/settings';
import { username, password } from '/cypress/not-public/authentication';

Cypress.Commands.add('init', (type) => {
    const url = settings.url[settings.env];
    cy.wait(500);
    if (settings.env === 'acceptance') {
        cy.visit(url, {
            auth: {
                username: username,
                password: password,
            },
        })
    } else {
        cy.visit(url)
    }

    cy.wait(500);
    cy.get('input#user-consent').check();
    cy.get('.btn').click();

    cy.wait(500);
    cy.get('#proof-choice-' + type).click();
    cy.wait(500);
})

Cypress.Commands.add('tokenFlow', (user) => {
    cy.init('negative-test');
    cy.get('#other-location-negative-test').click();
    cy.wait(500);
    cy.get('#input-test-code').clear();
    cy.get('#input-test-code').type(user.token);
    cy.wait(500);
    cy.get('#submit-test-code').click();
    if (user.verification) {
        cy.get('#input-verification-code').clear();
        cy.get('#input-verification-code').type(user.verification);
        cy.wait(500);
        cy.get('#submit-verification-code').click();
    }
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

Cypress.Commands.add('goToPrint', (type) => {
    // wait a little longer for collecting
    cy.wait(2000);
    cy.get('#create-qr-' + type).click();

    // cy.wait(500);
    // cy.get('#open-pdf').click();
})

Cypress.Commands.add('createQR', (type) => {
    cy.goToPrint(type)
    // cy.wait(500);
    // cy.get('#open-pdf').click();
})

Cypress.Commands.add('modalShouldSay', (string) => {
    cy.wait(500);
    cy.get('.modal').should('exist')
    cy.get('.modal h1').contains(string)
})

Cypress.Commands.add('modalShouldClose', (byRefute) => {
    cy.wait(500);
    if (byRefute) {
        cy.get('#modal-refute').click();
    } else {
        cy.get('#modal-close').click();
    }

    // wait for fade out
    cy.wait(2000);
    cy.get('.modal').should('not.exist')
})

Cypress.Commands.add('pageShouldSay', (string) => {
    cy.wait(500);
    cy.get('main h1').should('exist')
    cy.get('main h1').contains(string)
})
