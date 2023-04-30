Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(`${password}{enter}`);
  cy.get('ion-button[type=submit]').click();
  
  // cy.url().should('eq', `${Cypress.config().baseUrl}/home/feed`);
  // cy.get('ion-title')
  // .contains('Memory Lane');
});

Cypress.Commands.add('register', (username: string, email: string, password: string) => {
  cy.visit('/register');
  cy.get('input[type=text]').type(username);
  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(`${password}{enter}`);
  cy.get('ion-button[type=submit]').click();
  
  // cy.url().should('eq', `${Cypress.config().baseUrl}/home/feed`);
  // cy.get('ion-title')
  // .contains('Memory Lane');
});
