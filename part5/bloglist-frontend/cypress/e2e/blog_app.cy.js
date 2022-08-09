const testUser = { username: 'testUser', password: 'testPassword' }
describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })
  it('Front page opened', () => {
    cy.contains('Login into app')
  })

  it('Should login', () => {
    cy.get('[placeholder="Username"]').type(testUser.username)
    cy.get('[placeholder="Password"]').type(testUser.password)
    cy.get('[type="submit"]').click()
  })

  it('Should fail login', () => {
    cy.contains('Logout').click()
    cy.visit('http://localhost:3000')
    cy.get('[placeholder="Username"]').type(testUser.username)
    cy.get('[placeholder="Password"]').type('wrong')
    cy.get('[type="submit"]').click()
    cy.contains('Username or Password did not match')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})
