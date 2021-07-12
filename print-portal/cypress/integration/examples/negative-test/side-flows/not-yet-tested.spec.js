import dictionary from '/src/data/language/dictionary';

context('Side flow: Not yet tested', () => {
    it('Should see info about not being tested yet', () => {
        cy.init('negative-test');
        cy.get('#not-yet-tested').click();
        cy.modalShouldSay(dictionary.nl.message.info.didNotGetTestedYet.head)
        cy.modalShouldClose()
    })
})
