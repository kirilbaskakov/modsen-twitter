describe('template spec', () => {
  it('passes', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    cy.visit('');

    cy.contains('Log in').click();
    cy.contains('Phone number').type('kirill_baskakov12@mail.ru');
    cy.contains('Password').type('1234567890');
    cy.contains('Log In').click();

    cy.url().should('contain', '/feed');
  });
});
