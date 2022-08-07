import { render } from '@testing-library/react'
import Blog from './Blog'

const renderBlog = (blog, onDelete) => {
  const props = { blog, onDelete }
  const rendererComponent = render(<Blog {...props} />)
  return rendererComponent
}

describe('Blog Component', () => {
  it('Should render basic component', () => {
    const mockBlog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 1,
      url: 'www.test.com',
    }
    const mockOnDelete = jest.fn()
    const component = renderBlog(mockBlog, mockOnDelete)
    expect(component.queryByText(mockBlog.title)).toBeDefined()
    expect(component.queryByText(mockBlog.author)).toBeDefined()
  })
})
