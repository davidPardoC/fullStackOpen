const testUser = { username: 'testUser', password: 'testPassword' }
const testBlog = { title: 'Test Blog', author: 'Test Autor', url: 'Test Url' }
describe('Add Blog', () => {
  before(function () {
    cy.resetBe()
    cy.registerUser(testUser)
    cy.login(testUser)
  })

  beforeEach(function () {
    cy.viewport('iphone-6')
  })
  it('A blog can be created', () => {
    cy.contains('Add Blog').click()
    cy.contains('Title:').parent().find('input').type(testBlog.title)
    cy.contains('Author:').parent().find('input').type(testBlog.author)
    cy.contains('Url:').parent().find('input').type(testBlog.url)
    cy.get('[value="Create"]').click()
    cy.contains('show').parent().contains(testBlog.title)
    cy.contains('show').click()
    cy.contains('like').click()
    cy.contains('1')
  })
  it('Should logout', () => {
    cy.contains('Logout').click()
    cy.visit('http://localhost:3000')
  })
  it('Should login with another user', () => {
    cy.registerUser({ username: 'testUser2', password: 'testPassword2' })
    cy.login({ username: 'testUser2', password: 'testPassword2' })
    cy.contains('Add Blog').click()
    cy.contains('Title:').parent().find('input').type('Test blog 2')
    cy.contains('Author:').parent().find('input').type('test author 2')
    cy.contains('Url:').parent().find('input').type('test url 2')
    cy.get('[value="Create"]').click()
    cy.contains('test author 2').parent().parent().contains('show').click()
    cy.contains('test author 2')
      .parent()
      .parent()
      .parent()
      .contains('Remove')
      .click()
    cy.get('.blog').eq(0).should('contain', testBlog.title)
    cy.get('.blog').eq(1).should('contain', 'Test blog 2')
    cy.contains('show').click()
    cy.contains('Remove').click()
    cy.contains('Request failed with status code 403')
  })
})
