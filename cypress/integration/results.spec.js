// Using aliases as variables

describe('Text box with max characters', () => {
    it('displays the appropriate remaining character count on first name text box', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy="first-name-chars-left-count"]')
            .as('charsLeftSpan');

        cy.get('[data-cy="input-first-name"]')
            .as('charInput');

        // $charsLeftSpan is DOM element cypress has returned
        cy.get('@charsLeftSpan')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('15');
            });


        cy.get('@charInput').type('Jane');

        cy.get('@charsLeftSpan')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('11');
            });
    });

    it('displays the appropriate remaining character count on last name text box', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy="last-name-chars-left-count"]')
            .as('charsLeftSpan');

        cy.get('[data-cy="input-last-name"]')
            .as('charInput');

        cy.get('@charsLeftSpan')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('15');
            });

        cy.get('@charInput').type('Doe');

        cy.get('@charsLeftSpan')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('12');
            });
    });

    it('prevents user from typing more than the max no. of allowed characters', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy="input-first-name"]')
            .as('charInputFirstName');

        cy.get('[data-cy="input-last-name"]')
            .as('charInputLastName');

        cy.get('@charInputFirstName').type('JaneDoeLikesJohnDoe');
        cy.get('@charInputFirstName').should('have.attr', 'value', 'JaneDoeLikesJoh');

        cy.get('@charInputLastName').type('JaneDoeLikesJohnDoe');
        cy.get('@charInputLastName').should('have.attr', 'value', 'JaneDoeLikesJoh');
    });
});