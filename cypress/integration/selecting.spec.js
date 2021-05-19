describe('Text box with max characters', () => {
    it('displays the appropriate remaining character count on first name text box', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy="first-name-chars-left-count"]')
            .invoke('text')
            .should('equal', '15');

        cy.get('[data-cy="input-first-name"]').type('Jane');

        cy.get('[data-cy="first-name-chars-left-count"]')
            .invoke('text')
            .should('equal', '11');
    });

    it('displays the appropriate remaining character count on last name text box', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy="last-name-chars-left-count"]')
            .invoke('text')
            .should('equal', '15');

        cy.get('[data-cy="input-last-name"]').type('Doe');

        cy.get('[data-cy="last-name-chars-left-count"]')
            .invoke('text')
            .should('equal', '12');
    });

    it('prevents user from typing more than the max no. of allowed characters', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy="input-first-name"]').type('JaneDoeLikesJohnDoe');
        cy.get('[data-cy="input-first-name"]').should('have.attr', 'value', 'JaneDoeLikesJoh');

        cy.get('[data-cy="input-last-name"]').type('JaneDoeLikesJohnDoe');
        cy.get('[data-cy="input-last-name"]').should('have.attr', 'value', 'JaneDoeLikesJoh');
    });
});