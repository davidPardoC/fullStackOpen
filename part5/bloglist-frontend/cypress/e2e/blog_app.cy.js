describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Front page opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Login into app')
  })

  it('Should login', () => {
    cy.get('[placeholder="Username"]').type('davidPardoC')
    cy.get('[placeholder="Password"]').type('123')
    cy.get('[type="submit"]').click()
  })
})
