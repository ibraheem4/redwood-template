import React from 'react'

import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

interface LanguageCode {
  title: string
  emoji: string
}

const LanguageSelect = () => {
  const { t, i18n, changeLang } = useLanguageDirection()

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const languageCode = event.target.value
    changeLang(languageCode)
  }

  return (
    <>
      <div>Current language: {t(`languageCodes.${i18n.language}`)}</div>
      <select onChange={handleLanguageChange}>
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
