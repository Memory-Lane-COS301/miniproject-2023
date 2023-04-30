Cypress.Commands.add('register', ( email: string, password: string) => {
    cy.visit('/register');
    cy.viewport('iphone-x');
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(`${password}`);
    cy.wait(5*1000); //tests happening too fast
    cy.get('.register-btn').click();
    
    cy.url().should('eq', `${Cypress.config().baseUrl}/home/feed`);
    cy.get('ion-title')
    .contains('Memory Lane');
  });