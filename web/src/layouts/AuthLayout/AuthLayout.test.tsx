import { render } from '@redwoodjs/testing/web'

import AuthLayout from './AuthLayout'

jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  useLocation: jest.fn().mockReturnValue({ search: '' }),
}))

jest.mock('src/utils/translations', () => ({
  useLanguageDirection: jest.fn(() => ({
    i18n: { changeLanguage: jest.fn(), language: 'en' },
    changeLang: jest.fn(),
  })),
}))

describe('AuthLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthLayout />)
    }).not.toThrow()
  })
})
