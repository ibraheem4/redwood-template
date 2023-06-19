// TODO: Test this utility function
import { useTranslation } from 'react-i18next'

const useLanguageDirection = () => {
  const { t, i18n } = useTranslation()

  const directionValue = Object.freeze(['ar']).includes(i18n.language)
    ? 'rtl'
    : 'ltr'

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang)
    document.documentElement.setAttribute('dir', directionValue)
    document.documentElement.lang = newLang
  }

  return { t, i18n, directionValue, changeLang }
}

export { useLanguageDirection }
