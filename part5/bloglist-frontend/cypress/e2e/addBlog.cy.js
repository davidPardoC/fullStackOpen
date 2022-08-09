const testUser = { username: 'testUser', password: 'testPassword' }
const testBlog = { title: 'Test Blog', author: 'Test Autor', url: 'Test Url' }
describe('Add Blog', () => {
  before(function () {
    cy.resetBe()
    cy.registerUser(testUser)
    cy.login(testUser)
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
})
