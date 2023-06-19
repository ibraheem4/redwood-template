import { render } from '@redwoodjs/testing/web'

import CommentForm from './CommentForm'

const BLOG_POST = {
  id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
}

describe('CommentForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentForm postId={BLOG_POST.id} />)
    }).not.toThrow()
  })
})
