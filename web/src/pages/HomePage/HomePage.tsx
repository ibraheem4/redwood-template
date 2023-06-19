import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BlogPostsCell from 'src/components/BlogPostsCell'

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const directionValue = Object.freeze(['ar']).includes(i18n.language)
    ? 'rtl'
    : 'ltr'
  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang)
    document.documentElement.setAttribute('dir', directionValue)
    document.documentElement.lang = newLang
  }
  useEffect(() => {
    document.documentElement.setAttribute('dir', directionValue)
    document.documentElement.lang = i18n.language
  })
  const displayLanguageSwitcher = () => {
    return (
      <>
        <h1>{t('HomePage.header')}</h1>
        <div>Current language: {t(`languageCodes.` + i18n.language)}</div>
        <div>Direction value: {directionValue}</div>
        <button onClick={() => changeLang('fr')}>
          {t('languageCodes.fr')}
        </button>
        <button onClick={() => changeLang('en')}>
          {t('languageCodes.en')}
        </button>
        <button onClick={() => changeLang('ar')}>
          {t('languageCodes.ar')}
        </button>
        <p>
          {t('HomePage.info')} <code>./web/src/pages/HomePage/HomePage.js</code>
        </p>
        <p>
          {t('HomePage.route')} <code>home</code>, {t('HomePage.link')}`
          <Link to={routes.home()}>Home</Link>`
        </p>
      </>
    )
  }

  return (
    <>
      <MetaTags
        title={t('HomePage.title')}
        description={t('HomePage.header')}
        locale={i18n.language}
      />
      <BlogPostsCell />
      {displayLanguageSwitcher()}
    </>
  )
}

export default HomePage
