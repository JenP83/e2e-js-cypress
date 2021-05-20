// Test accessing an Env variable:
alert(Cypress.env('MY_ENV_VAR'));

describe('Basic page interactions', () => {
    beforeEach(() => {
        cy.visit('/example-4');
    });

    it('sets the header text to the item\'s name when double clicked', () => {
        // double click on 2nd element and assert header displays 'Option Two'
        cy.get('[data-cy="box-1-items-list"] > :nth-child(2)')
            .dblclick();

        cy.get('[data-cy="box-1-items-list"] > :nth-child(2)')
            .invoke('text')
            .should('equal', 'Option Two');
    });

    it('displays count of 1 for the number of selected checkboxes when first checkbox selected', () => {
        // select the first checkbox and assert only one box is selected
        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(1) input')
            .check();

        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal', '1');
    });

    it('displays count of 1 for the number of selected checkboxes when last checkbox selected', () => {
        // select the third checkbox and assert only one box is selected
        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(3) input')
            .check();

        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal', '1');
    });

    it('displays count of 2 for the number of selected checkboxes', () => {
        // select the first 2 checkboxes and assert 2 boxes are selected
        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(1) input')
            .check();

        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(2) input')
            .check();

        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal', '2');
    });

    it('displays count of 3 for the number of selected checkboxes', () => {
        // select all 3 checkboxes and assert 3 boxes are selected
        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(1) input')
            .check();

        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(2) input')
            .check();

        cy.get('[data-cy="box-2-checkboxes"] > :nth-child(3) input')
            .check();

        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal', '3');
    });

    it('displays the name of the currently selected item from dropdown list', () => {
        // click dropdown, select Option Three and assert header displays 'Option Three'
        cy.get('[data-cy="box-3-dropdown"]')
            .select('Option Three');

        cy.get('[data-cy="box-3-selected-name"]')
            .invoke('text')
            .should('equal', 'Option Three');
    });

    it('should display the name of the most recently hovered item', () => {
        cy.get('[data-cy="box-4-items-list"] > :nth-child(1)')
            .trigger('mouseover')
        // Debug this test:
        //.debug();

        cy.get('[data-cy="box-4-selected-name"]')
            .invoke('text')
            .should('equal', 'Option One');
    });

});
