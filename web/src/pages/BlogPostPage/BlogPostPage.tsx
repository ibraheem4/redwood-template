import { MetaTags } from '@redwoodjs/web'

import BlogPostCell from 'src/components/BlogPostCell'

interface Props {
  id: string
}

const BlogPostPage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="BlogPost" description="BlogPost page" />

      <BlogPostCell id={id} />
    </>
  )
}

export default BlogPostPage
