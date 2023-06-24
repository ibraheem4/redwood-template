import { render, fireEvent, getByText } from '@redwoodjs/testing'

import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

import LanguageSelect from './LanguageSelect'

// Mock the hook and cast to jest.Mock
jest.mock('src/utils/translations')
const mockUseLanguageDirection = useLanguageDirection as jest.Mock

describe('LanguageSelect', () => {
  const changeLangMock = jest.fn()

  beforeEach(() => {
    // Provide mock implementation
    mockUseLanguageDirection.mockImplementation(() => ({
      t: (key: string) => key.split('.').pop(),
      i18n: { language: 'en' },
      changeLang: changeLangMock,
    }))
  })

  afterEach(() => {
    changeLangMock.mockClear()
  })

  it('renders a button for each language code', () => {
    const { container } = render(<LanguageSelect />)
    Object.keys(languageCodes).forEach((languageCode) => {
      const { title, emoji } =
        languageCodes[languageCode as keyof typeof languageCodes]
      expect(getByText(container, `${title} ${emoji}`)).toBeInTheDocument()
    })
  })

  it('changes language when button is clicked', () => {
    const { container } = render(<LanguageSelect />)
    Object.keys(languageCodes).forEach((languageCode) => {
      const { title, emoji } =
        languageCodes[languageCode as keyof typeof languageCodes]
      fireEvent.click(getByText(container, `${title} ${emoji}`))
      expect(changeLangMock).toHaveBeenCalledWith(languageCode)
    })
  })
})
