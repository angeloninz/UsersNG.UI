describe('Users', () => {
  it('Should display users lists', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();

    cy.url().should('include', 'users');
    cy.contains('Users');
  });

  it('Should display add new user', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();

    cy.url().should('include', 'users');
    cy.contains('Users');

    cy.visit('/users/add');
    cy.contains('Add New User');
  });

  it('Unable to add new user if form is invalid', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();

    cy.url().should('include', 'users');
    cy.contains('Users');

    cy.visit('/users/add');
    cy.contains('Add New User');
    cy.get('.btn-primary').click();
    cy.contains('Please enter all fields!');
  });
});
