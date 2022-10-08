var randomstring = require('randomstring');

describe('Login', () => {
  it('Should display register form', () => {
    cy.visit('/register');
    cy.url().should('includes', 'register');
    cy.contains('Register');
  });
  it('Should not register if form is invalid', () => {
    cy.visit('/register');
    cy.url().should('includes', 'register');
    cy.contains('Register');
    cy.get('.btn-primary').click();
    cy.contains('Please enter all fields!');
  });
  it('Able to register user if form is valid', () => {
    var rndString = randomstring.generate(5);
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.contains('Please sign in');
    cy.get('[name=email]').type('admin8@gmail.com');
    cy.get('[name=password]').type('admin8');
    cy.get('button').click();

    cy.visit('/register');
    cy.url().should('includes', 'register');
    cy.get('[name=firstname]').type('admin');
    cy.get('[name=lastname]').type('super');
    cy.get('[name=email]').type(`admin8${rndString}.@gmail.com`);
    cy.get('[name=password]').type('admin8');
    cy.get('.btn-primary').click();
    cy.url().should('include', 'login');
  });
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
