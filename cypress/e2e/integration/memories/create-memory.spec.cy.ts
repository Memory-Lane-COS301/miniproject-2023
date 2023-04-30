import * as data from '../../../data';

describe('Memories', () => {
    it(`Login User with email=${data.registredUser.email}`, () => {
        cy.login(data.registredUser.email, data.registredUser.password);
      });
      
    it('visits home/feed',()=>{
        cy.visit('home/feed');
        cy.get('ion-title')
        .contains('Memory Lane');
        cy.get('svg').should('have.length', 3);//there are 5 custom icons
        cy.get('.account-time').should('exist');
    })
    
    it('assert create memory page',()=>{
        cy.visit('home/feed');
        cy.get('.empty-feed').should('exist');
        cy.get('.add-btn').click();
        cy.contains('Add Memory');
        cy.contains('Description');
        cy.contains('Title');
        cy.get('ion-textarea[maxlength=80]').should('have.attr', 'placeholder').and('include', 'Type a description');
        cy.get('ion-input[maxlength=23]').should('have.attr', 'placeholder').and('include', 'Enter a title');
        cy.get('input[type=file]').should('exist');
        cy.get('#ion-overlay-1 > app-add-memory > ion-content > ion-list > ion-card').should('exist');
        cy.get('ion-button[ngclass=button-cancel]').should('exist');
        cy.get('ion-button[ngclass=button-add]').should('exist');
    })
    
    it('cancel creating memory',()=>{     
        cy.visit('home/feed');
        cy.get('.add-btn').click();
        cy.get('ion-button[ngclass=button-cancel]').click();
        cy.get('#ion-overlay-6').should('not.exist');
    })
    
    it('add memory',()=>{        
        cy.visit('home/feed');
        // cy.get('.add-btn').click();
        // cy.get('#ion-overlay-1 > app-add-memory > ion-content > ion-list > ion-item:nth-child(1) > ion-input > input').type('A Title');
        // cy.get('.native-textarea')
        // .type('A description');
        // cy.get('input[type=file]').selectFile('cypress/data/pic.jpg');
        // cy.get('#ion-overlay-1 > app-add-memory > ion-content > ion-list > ion-card > ion-card-content > ion-text.memory-show-more.md.hydrated')
        // .click();
        // cy.get('img').should('exist');
        // cy.get('ion-button[ngclass=button-add]').click();
        // cy.get('#ion-overlay-6').should('not.exist');
        // cy.wait(5*1000);
        //cy.get('ion-button[ngclass=button-add]').click();
        cy.get('#tab-button-profile-view').click();
        cy.wait(5*1000);
        cy.url().should('eq', `${Cypress.config().baseUrl}/home/profile-view`);
        cy.get(':nth-child(1) > :nth-child(1) > .memory-card > .card-content-md > .memory-card-title').should('exist');
        cy.get(':nth-child(1) > :nth-child(1) > .memory-card > .card-content-md > .span-post-timer > .memory-card-timer').should('exist');
    })
  
    it('Logs the user out',()=>{
      cy.logout();
    })

});