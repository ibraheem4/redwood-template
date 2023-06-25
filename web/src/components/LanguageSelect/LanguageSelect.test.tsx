import userEvent from '@testing-library/user-event'

import { render, getByText } from '@redwoodjs/testing'

import { DEFAULT_LANGUAGE } from 'src/utils/constants'
import { languageCodes } from 'src/utils/languageCodes'
import { useLanguageDirection } from 'src/utils/translations'

import LanguageSelect from './LanguageSelect'

jest.mock('src/utils/translations')
const mockUseLanguageDirection = useLanguageDirection as jest.Mock

describe('LanguageSelect', () => {
  const changeLangMock = jest.fn()
  const language = DEFAULT_LANGUAGE

  beforeEach(() => {
    mockUseLanguageDirection.mockImplementation(() => ({
      t: (key: string) => key.split('.').pop(),
      i18n: { language },
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

  it('has the initial language selected', () => {
    const { container } = render(<LanguageSelect />)
    const select = container.querySelector('select')
    const option = select?.querySelector(
      `option[value='${language}']`
    ) as HTMLOptionElement
    expect(option?.selected).toBeTruthy()
  })

  it('changes language when a new option is selected', async () => {
    const { container } = render(<LanguageSelect />)
    const select = container.querySelector('select')

    if (select) {
      await userEvent.selectOptions(select, ['fr'])
      expect(changeLangMock).toHaveBeenCalledWith('fr')
    } else {
      throw new Error('Select element not found')
    }
  })
})
