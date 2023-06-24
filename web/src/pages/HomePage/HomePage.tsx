import React, { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

import BlogPostsCell from 'src/components/BlogPostsCell'
import { DEFAULT_POSTS_PER_PAGE } from 'src/utils/constants'
import { useLanguageDirection } from 'src/utils/translations'

const HomePage = ({ page, postsPerPage = DEFAULT_POSTS_PER_PAGE }) => {
  const { t, i18n, directionValue } = useLanguageDirection()

  useEffect(() => {
    document.documentElement.setAttribute('dir', directionValue)
    document.documentElement.lang = i18n.language
  }, [directionValue, i18n.language])

  // Ensure page and postsPerPage are numbers
  page = isNaN(page) ? 1 : Number(page)
  postsPerPage = isNaN(postsPerPage)
    ? DEFAULT_POSTS_PER_PAGE
    : Number(postsPerPage)

  return (
    <>
      <MetaTags
        title={t('HomePage.title')}
        description={t('HomePage.header')}
        locale={i18n.language}
      />
      <BlogPostsCell page={page} postsPerPage={postsPerPage} />
    </>
  )
}

export default HomePage
