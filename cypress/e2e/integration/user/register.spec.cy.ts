import { User } from '../../../data/User.interface';
import * as data from '../../../data/index';  

const filePath = '../../../data/registered_users.json';

describe('Register Page', () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
  })
  
  beforeEach(()=>{
    cy.visit('/register');
    cy.viewport('iphone-x');
  })
  
  it('visit register page', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/register`);
  });

  it('asserting register page', () => {
    cy.get('ion-img')
      .should('have.attr', 'src')
      .and('include', '/assets/Design_icons/Login-page-background-and-images/Memory-lane-logo.png');
    cy.get('input[type=email]').should('have.attr', 'placeholder').and('include', 'Email');

    cy.get('input[type=password]').should('have.attr', 'placeholder').and('include', 'Password');

    cy.get('ion-button[type=submit]').contains('Register');

    cy.contains('Already have an account? ');
    cy.get('ion-nav-link[routerlink="/login"]').should('exist');

    cy.contains('©2023 Mini-Project (Pty) Ltd.');
  });

  it('required email', () => {
    cy.get('input[type=email]').click();
    cy.get('input[type=password]').click();
    cy.get('ion-button[type=submit]').should('have.attr', 'disabled');
  });

  it('required password', () => {
    cy.get('input[type=password]').click();
    cy.get('body').click();
    cy.get('ion-button[type=submit]').should('have.attr', 'disabled');
  });
  
  it(`Register data.user with email=${data.user.email}`, () => {
    cy.register(data.user.email, data.user.password);
    cy.writeFile(filePath,JSON.stringify(data.user));
    cy.url().should('eq', `${Cypress.config().baseUrl}/home/feed`);
    cy.get('ion-title')
    .contains('Memory Lane');
  });
  
  it('Logs the user out',()=>{
    cy.logout();
  })
});
