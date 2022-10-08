var randomstring = require('randomstring');

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

  it('Unable to add new user if email already exists', () => {
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
    cy.get('[name=firstname]').type('admin');
    cy.get('[name=lastname]').type('super');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('.btn-primary').click();
    cy.contains('Email already exists!');
  });

  it('Able to add user if form is valid', () => {
    var rndString = randomstring.generate(5);
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
    cy.get('[name=firstname]').type('admin');
    cy.get('[name=lastname]').type('super');
    cy.get('[name=email]').type(`admin123${rndString}.@gmail.com`);
    cy.get('[name=password]').type('admin123');
    cy.get('.btn-primary').click();
    cy.url().should('include', 'users');
    //cy.contains('admin@gmail.com');
  });

  it('should display edit user', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();

    cy.get('.view-user-details').eq(1).click();
    cy.url().should('include', 'edit');
  });

  it('Unable to edit user if email already exists', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();

    cy.get('.view-user-details').eq(1).click();
    cy.url().should('include', 'edit');
    cy.get('[name=email]').clear();
    cy.get('[name=email]').type('admin@gmail.com');
    //cy.pause();
    cy.get('.btn-primary').click();
    cy.contains('Email already exists!');
  });

  it('Unable to edit user if form is invalid', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();

    cy.get('.view-user-details').eq(1).click();
    cy.url().should('include', 'edit');
    cy.get('[name=email]').clear();
    cy.get('.btn-primary').click();
    cy.contains('Please enter all fields!');
  });

  it('Able to delete a user ', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin@gmail.com');
    cy.get('[name=password]').type('admin123');
    cy.get('button').click();

    cy.get('.view-user-details').eq(1).click();
    cy.url().should('include', 'edit');
    cy.get('.btn-danger').click();
    cy.url().should('includes', 'users');
  });
});
