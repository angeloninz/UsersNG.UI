describe('Login', () => {
  it('Should not login if the form is invalid', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin');
    cy.get('button').click();
    cy.url().should('not.include', 'users');
  });

  it('Should login if the form is valid', () => {
    //cy.login('admin@gmail.com', 'admin123');
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();
    //cy.pause();
    cy.url().should('include', 'users');
  });

  it('Should be able to logout', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();
    //cy.pause();
    cy.url().should('include', 'users');

    cy.get('.logout').click();
    cy.url().should('include', 'login');
  });
});
