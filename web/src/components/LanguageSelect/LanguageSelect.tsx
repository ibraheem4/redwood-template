import React from 'react'

import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

interface LanguageCode {
  title: string
  emoji: string
}

const LanguageSelect = () => {
  const { t, i18n, changeLang } = useLanguageDirection()

  const renderLanguageButton = (languageCode: keyof typeof languageCodes) => {
    const { title, emoji }: LanguageCode = languageCodes[languageCode]
    return (
      <button key={languageCode} onClick={() => changeLang(languageCode)}>
        {`${title} ${emoji}`}
      </button>
    )
  }

  return (
    <>
      <div>Current language: {t(`languageCodes.${i18n.language}`)}</div>
      {Object.keys(languageCodes).map((key) =>
        renderLanguageButton(key as keyof typeof languageCodes)
      )}
    </>
  )
}

export default LanguageSelect
