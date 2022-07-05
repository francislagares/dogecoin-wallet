/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
describe('Authentication', () => {
  it('displays signin button', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /sign in/i }).should('exist');
  });
});

const asModule = {};
export default asModule;