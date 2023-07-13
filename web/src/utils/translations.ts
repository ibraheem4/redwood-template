// TODO: Test this utility function
import { useTranslation } from 'react-i18next'

const useLanguageDirection = () => {
  const { t, i18n } = useTranslation()

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang)

    const directionValue = Object.freeze(['ar']).includes(newLang)
      ? 'rtl'
      : 'ltr'

    document.documentElement.setAttribute('dir', directionValue)
    document.documentElement.lang = newLang
  }

  return { t, i18n, changeLang }
}

export { useLanguageDirection }
