// Replace repeated code with beforeEach() function
// baseUrl http://localhosl:3000 in cypress.json

describe('Text box with max characters', () => {
    beforeEach(() => {
        cy.visit('/example-3');

        cy.get('[data-cy="first-name-chars-left-count"]')
            .as('charsLeftSpanFirstName');

        cy.get('[data-cy="input-first-name"]')
            .as('charInputFirstName');

        cy.get('[data-cy="last-name-chars-left-count"]')
            .as('charsLeftSpanLastName');

        cy.get('[data-cy="input-last-name"]')
            .as('charInputLastName');
    });

    it('displays the appropriate remaining character count on first name text box', () => {

        // $charsLeftSpan is DOM element cypress has returned
        cy.get('@charsLeftSpanFirstName')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('15');
            });

        cy.get('@charInputFirstName').type('Jane');

        cy.get('@charsLeftSpanFirstName')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('11');
            });
    });

    it('displays the appropriate remaining character count on last name text box', () => {

        cy.get('@charsLeftSpanLastName')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('15');
            });

        cy.get('@charInputLastName').type('Doe');

        cy.get('@charsLeftSpanLastName')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('12');
            });
    });

    it('prevents user from typing more than the max no. of allowed characters', () => {

        cy.get('@charInputFirstName').type('JaneDoeLikesJohnDoe');
        cy.get('@charInputFirstName').should('have.attr', 'value', 'JaneDoeLikesJoh');

        cy.get('@charInputLastName').type('JaneDoeLikesJohnDoe');
        cy.get('@charInputLastName').should('have.attr', 'value', 'JaneDoeLikesJoh');
    });
});