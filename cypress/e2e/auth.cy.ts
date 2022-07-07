describe('Authentication', () => {
  it('allows user to signin and create a transaction', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /sign in/i })
      .should('exist')
      .click();

    cy.url().should('include', '/api/auth/signin');

    cy.findByLabelText(/email/i).clear().type('dogecoin@test.com');
    cy.findByLabelText(/password/i)
      .clear()
      .type('1234');
    cy.findByRole('button', { name: /sign in with credentials/i }).click();

    cy.findByRole('button', { name: /transactions/i })
      .should('exist')
      .click();

    cy.findByRole('button', { name: /add transaction/i }).click();

    cy.findByPlaceholderText(/address/i)
      .clear()
      .type('0xac109c8025f272414fd9e2faa805a583708a017f');
    cy.findByPlaceholderText(/amount/i)
      .clear()
      .type('2.25098743');
    cy.findByRole('button', { name: /add transaction/i }).click();
  });
});

const asModule = {};
export default asModule;
