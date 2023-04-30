Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/login');
    cy.viewport('iphone-x');
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(`${password}{enter}`);
    cy.wait(5*1000);
    cy.get('ion-button[type=submit]').click();
    
    cy.url().should('eq', `${Cypress.config().baseUrl}/home/feed`);
    cy.get('ion-title')
    .contains('Memory Lane');
  });