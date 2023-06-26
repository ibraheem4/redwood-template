import { useLocation } from '@redwoodjs/router'

import { DEFAULT_LANGUAGE } from 'src/utils/constants'

export const appendLangToRoute = (route: string): string => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const langParam = params.get('lang')

  // If langParam is null or equal to DEFAULT_LANGUAGE, we don't append anything
  if (!langParam || langParam === DEFAULT_LANGUAGE) {
    return route
  }

  // Check if route already has a query param
  if (route.includes('?')) {
    // Use & to concatenate if route already has a param
    return `${route}&lang=${langParam}`
  } else {
    // Else, use ? to start the params in the route
    return `${route}?lang=${langParam}`
  }
}
