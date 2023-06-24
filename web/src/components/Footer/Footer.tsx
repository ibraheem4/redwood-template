import React from 'react'

import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

const Footer = () => {
  const { t, i18n, directionValue, changeLang } = useLanguageDirection()

  const renderLanguageButton = (languageCode) => {
    const { title, emoji } = languageCodes[languageCode]
    return (
      <button key={languageCode} onClick={() => changeLang(languageCode)}>
        {`${title} ${emoji}`}
      </button>
    )
  }

  return (
    <footer>
      <div>Current language: {t(`languageCodes.${i18n.language}`)}</div>
      <div>Direction value: {directionValue}</div>
      {Object.keys(languageCodes).map(renderLanguageButton)}
    </footer>
  )
}

export default Footer
