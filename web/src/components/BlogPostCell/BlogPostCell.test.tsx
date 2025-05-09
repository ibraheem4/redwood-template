import { render, screen } from '@redwoodjs/testing'

import { Loading, Empty, Failure, Success } from './BlogPostCell'
import { standard } from './BlogPostCell.mock'

describe('BlogPostCell', () => {
  test('Loading renders successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  test('Empty renders successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  test('Failure renders successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  test('Success renders successfully', async () => {
    const blogPost = standard().blogPost
    render(<Success blogPost={blogPost} />)

    expect(screen.getByText(blogPost.title)).toBeInTheDocument()
    expect(screen.getByText(blogPost.body)).toBeInTheDocument()
  })
})
