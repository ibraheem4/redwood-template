import React, { useEffect } from 'react'

import { MetaTags as RedwoodMetaTags } from '@redwoodjs/web'

import { useLanguageDirection } from 'src/utils/translations'

const TranslatedMetaTags = ({ titleKey, descriptionKey }) => {
  const { t, i18n, directionValue } = useLanguageDirection()

  useEffect(() => {
    document.documentElement.setAttribute('dir', directionValue)
    document.documentElement.lang = i18n.language
  }, [directionValue, i18n.language])

  const title = t(titleKey)
  const description = t(descriptionKey)

  return (
    <RedwoodMetaTags
      title={title}
      description={description}
      locale={i18n.language}
    />
  )
}

export default TranslatedMetaTags
