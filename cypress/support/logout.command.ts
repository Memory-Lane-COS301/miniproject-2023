Cypress.Commands.add('logout', () => {
    cy.visit('/home');
    cy.get('#tab-button-profile-view').click();
    cy.get('.buttons-last-slot > .burger-menu').click();
    cy.get('ion-nav-link.hydrated > .menu-list-item > .menu-list-item-text').click();
    cy.get('ion-button').click();    
    cy.wait(5*1000);
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
})