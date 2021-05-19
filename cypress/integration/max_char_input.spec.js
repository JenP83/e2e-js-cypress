describe('Text box with max characters', () => {
    it('displays the appropriate remaining character count', () => {
        cy.visit('http://localhost:3000/example-2');

        cy.get('span')
            .invoke('text')
            .should('equal', '15');

        cy.get('input').type('hello');

        cy.get('span')
            .invoke('text')
            .should('equal', '10');

        cy.get('input').type(' my friend');

        cy.get('span')
            .invoke('text')
            .should('equal', '0');
    });

    it('prevents user from typing more than the max no. of allowed characters', () => {
        cy.visit('http://localhost:3000/example-2');

        cy.get('input').type('abcdefghijklmnopqrstuvwxyz');

        cy.get('input').should('have.attr', 'value', 'abcdefghijklmno');
    });
});