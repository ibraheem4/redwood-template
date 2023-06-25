import React, { useEffect } from 'react'

import { useLocation, navigate } from '@redwoodjs/router'

import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

interface LanguageCode {
  title: string
  emoji: string
}

const LanguageSelect = () => {
  const { i18n, changeLang } = useLanguageDirection()
  const { search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const urlLanguageCode = params.get('lang') || 'en'
    if (urlLanguageCode !== i18n.language) {
      changeLang(urlLanguageCode)
    }
  }, [changeLang, i18n.language, search])

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const languageCode = event.target.value

    // If the selected language is English, navigate without the 'lang' parameter.
    if (languageCode === 'en') {
      navigate(window.location.pathname)
    } else {
      const params = new URLSearchParams(window.location.search)
      params.set('lang', languageCode)
      navigate(`?${params.toString()}`)
    }

    changeLang(languageCode)
  }

  return (
    <>
      <select value={i18n.language} onChange={handleLanguageChange}>
        {Object.keys(languageCodes).map((key) => {
          const { title, emoji }: LanguageCode =
            languageCodes[key as keyof typeof languageCodes]
          return (
            <option key={key} value={key}>
              {`${title} ${emoji}`}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default LanguageSelect
