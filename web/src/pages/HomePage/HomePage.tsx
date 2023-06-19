import React, { useEffect } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BlogPostsCell from 'src/components/BlogPostsCell'
import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

const displayLanguageSwitcher = ({ t, i18n, directionValue, changeLang }) => {
  const renderLanguageButton = (languageCode) => {
    const { title, emoji } = languageCodes[languageCode]
    return (
      <button key={languageCode} onClick={() => changeLang(languageCode)}>
        {`${title} ${emoji}`}
      </button>
    )
  }

  return (
    <>
      <h1>{t('HomePage.header')}</h1>
      <div>Current language: {t(`languageCodes.${i18n.language}`)}</div>
      <div>Direction value: {directionValue}</div>
      {Object.keys(languageCodes).map(renderLanguageButton)}
      <p>
        {t('HomePage.info')} <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        {t('HomePage.route')} <code>home</code>, {t('HomePage.link')}
        <Link to={routes.home()}>Home</Link>
      </p>
    </>
  )
}

const HomePage = () => {
  const { t, i18n, directionValue, changeLang } = useLanguageDirection()

  useEffect(() => {
    document.documentElement.setAttribute('dir', directionValue)
    document.documentElement.lang = i18n.language
  }, [directionValue, i18n.language])

  return (
    <>
      <MetaTags
        title={t('HomePage.title')}
        description={t('HomePage.header')}
        locale={i18n.language}
      />
      <BlogPostsCell />
      {displayLanguageSwitcher({ t, i18n, directionValue, changeLang })}
    </>
  )
}

export default HomePage
