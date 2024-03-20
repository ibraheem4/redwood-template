import React from 'react'

import { render, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom'
import { MetaTags as RedwoodMetaTags } from '@redwoodjs/web'

import { useLanguageDirection } from 'src/utils/translations'

import TranslatedMetaTags from './TranslatedMetaTags'

jest.mock('src/utils/translations')
jest.mock('@redwoodjs/web', () => ({
  MetaTags: jest.fn(() => null),
}))

describe('TranslatedMetaTags', () => {
  it('renders correctly and updates the document direction and language', async () => {
    ;(useLanguageDirection as jest.Mock).mockImplementation(() => ({
      t: (key) => `Translated: ${key}`,
      i18n: { language: 'en' },
      directionValue: 'ltr',
    }))

    render(
      <TranslatedMetaTags
        titleKey="HomePage.title"
        descriptionKey="HomePage.header"
      />
    )

    // Wait for useEffect to run
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute('dir', 'ltr')
      expect(document.documentElement.lang).toBe('en')
    })

    // Check the title and description passed to RedwoodMetaTags
    expect(RedwoodMetaTags).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Translated: HomePage.title',
        description: 'Translated: HomePage.header',
        locale: 'en',
      }),
      expect.anything()
    )
  })
})
