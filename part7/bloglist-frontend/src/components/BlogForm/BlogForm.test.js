import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

const mockBlog = {
  title: 'Test Title',
  author: 'Test Author',
  likes: 1,
  url: 'www.test.com',
}

const renderComponent = ({ onSuccess, onError }) => {
  return render(<BlogForm {...{ onSuccess, onError }} />)
}

describe('Blog Form Component', () => {
  it('Should add new blog', async () => {
    const mockOnSuccess = jest.fn()
    jest.spyOn(blogService, 'createBog').mockResolvedValue(mockBlog)
    renderComponent({ onSuccess: mockOnSuccess, onError: jest.fn() })
    const user = userEvent.setup()
    const titleInput = screen.getAllByRole('textbox')[0]
    const authorInput = screen.getAllByRole('textbox')[1]
    const urlInput = screen.getAllByRole('textbox')[2]
    await user.type(titleInput, mockBlog.title)
    await user.type(authorInput, mockBlog.author)
    await user.type(urlInput, mockBlog.url)
    const submitButton = screen.getByText('Create')
    await user.click(submitButton)
    expect(mockOnSuccess).toHaveBeenCalledTimes(1)
  })
})
