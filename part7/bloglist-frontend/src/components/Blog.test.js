import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'
import Blog from './Blog'

const renderBlog = (blog, onDelete) => {
  const props = { blog, onDelete }
  const rendererComponent = render(<Blog {...props} />)
  return rendererComponent
}

const mockBlog = {
  title: 'Test Title',
  author: 'Test Author',
  likes: 1,
  url: 'www.test.com',
}

describe('Blog Component', () => {
  it('Should render basic component', () => {
    const mockOnDelete = jest.fn()
    const component = renderBlog(mockBlog, mockOnDelete)
    expect(component.queryByText(mockBlog.title)).toBeDefined()
    expect(component.queryByText(mockBlog.author)).toBeDefined()
  })

  it('Should show details on click show', async () => {
    const mockOnDelete = jest.fn()
    const component = renderBlog(mockBlog, mockOnDelete)
    const user = userEvent.setup()
    const showButton = await component.findByText('show')
    await user.click(showButton)
    expect(component.queryByText(mockBlog.likes)).toBeDefined()
    expect(component.queryByText(mockBlog.url)).toBeDefined()
  })

  it('Should show details on click show and click like button twice', async () => {
    const updateSpy = jest
      .spyOn(blogService, 'updateBlog')
      .mockResolvedValue(mockBlog)
    const mockOnDelete = jest.fn()
    const component = renderBlog(mockBlog, mockOnDelete)
    const user = userEvent.setup()
    const showButton = await component.findByText('show')
    await user.click(showButton)
    const likeButton = await component.findByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(updateSpy).toHaveBeenCalledTimes(2)
  })
})
