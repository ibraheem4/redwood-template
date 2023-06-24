import React from 'react'

import BlogPostsCell from 'src/components/BlogPostsCell'
import TranslatedMetaTags from 'src/components/TranslatedMetaTags'
import { DEFAULT_POSTS_PER_PAGE } from 'src/utils/constants'

interface HomePageProps {
  page?: number
  postsPerPage?: number
}

const HomePage: React.FC<HomePageProps> = ({
  page = 1,
  postsPerPage = DEFAULT_POSTS_PER_PAGE,
}) => {
  return (
    <>
      <TranslatedMetaTags
        titleKey="HomePage.title"
        descriptionKey="HomePage.header"
      />
      <BlogPostsCell page={page} postsPerPage={postsPerPage} />
    </>
  )
}

export default HomePage
