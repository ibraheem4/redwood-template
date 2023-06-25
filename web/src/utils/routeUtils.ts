import { useLocation } from '@redwoodjs/router'

export const appendLangToRoute = (route: string): string => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const langParam = params.get('lang') ? `?lang=${params.get('lang')}` : ''
  return route + langParam
}
