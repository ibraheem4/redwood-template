import { useLocation } from '@redwoodjs/router'

export const appendLangToRoute = (route: string): string => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const langParam = params.get('lang')

  if (langParam) {
    // Check if route already has a query param
    if (route.includes('?')) {
      // Use & to concatenate if route already has a param
      return `${route}&lang=${langParam}`
    } else {
      // Else, use ? to start the params in the route
      return `${route}?lang=${langParam}`
    }
  } else {
    return route
  }
}
