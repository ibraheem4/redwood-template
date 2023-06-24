import { render, screen } from '@redwoodjs/testing'

import { useLanguageDirection } from 'src/utils/translations'

import TranslatedMetaTags from './TranslatedMetaTags'

// Mock the useLanguageDirection hook
jest.mock('src/utils/translations', () => ({
  useLanguageDirection: jest.fn(),
}))

describe('TranslatedMetaTags', () => {
  beforeEach(() => {
    ;(useLanguageDirection as jest.Mock).mockImplementation(() => ({
      t: (key: string) => key,
      i18n: { language: 'en' },
      directionValue: 'ltr',
    }))
  })

  it('renders meta tags with translated title and description', () => {
    render(
      <TranslatedMetaTags
        titleKey="HomePage.title"
        descriptionKey="HomePage.header"
      />
    )

    const titleElement = screen.getByText('HomePage.title')
    expect(titleElement).toBeInTheDocument()

    const descriptionElement = screen.getByText('HomePage.header')
    expect(descriptionElement).toBeInTheDocument()

    const localeElement = screen.getByText('en')
    expect(localeElement).toBeInTheDocument()
  })
})
