describe('Memories Feed', () => {
    it('Visits feed',()=>{
        cy.visit('/home/feed');
        cy.viewport('iphone-x');
    });
})