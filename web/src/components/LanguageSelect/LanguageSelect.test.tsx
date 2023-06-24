import userEvent from '@testing-library/user-event'

import { render, getByText } from '@redwoodjs/testing'

import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

import LanguageSelect from './LanguageSelect'

jest.mock('src/utils/translations')
const mockUseLanguageDirection = useLanguageDirection as jest.Mock

describe('LanguageSelect', () => {
  const changeLangMock = jest.fn()

  beforeEach(() => {
    mockUseLanguageDirection.mockImplementation(() => ({
      t: (key: string) => key.split('.').pop(),
      i18n: { language: 'en' },
      changeLang: changeLangMock,
    }))
  })

  afterEach(() => {
    changeLangMock.mockClear()
  })

  it('renders an option for each language code', () => {
    const { container } = render(<LanguageSelect />)
    Object.keys(languageCodes).forEach((languageCode) => {
      const { title, emoji } =
        languageCodes[languageCode as keyof typeof languageCodes]
      expect(getByText(container, `${title} ${emoji}`)).toBeInTheDocument()
    })
  })

  it('changes language when a new option is selected', async () => {
    const { container } = render(<LanguageSelect />)
    const select = container.querySelector('select')

    if (select) {
      // Handle possibility of select being null
      // Use userEvent to change the select value
      await userEvent.selectOptions(select, ['fr'])
      expect(changeLangMock).toHaveBeenCalledWith('fr')
    } else {
      throw new Error('Select element not found')
    }
  })
})
