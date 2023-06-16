import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from './db'

export const getCurrentUser = async (session) => {
  return await db.user.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, roles: true },
  })
}

export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

type AllowedRoles = string | string[] | undefined

export const hasRole = (roles: AllowedRoles): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const currentUserRoles = context.currentUser?.roles

  if (typeof roles === 'string') {
    if (typeof currentUserRoles === 'string') {
      // roles to check is a string, currentUser.roles is a string
      return currentUserRoles === roles
    }
  }

  if (Array.isArray(roles)) {
    if (Array.isArray(currentUserRoles)) {
      // roles to check is an array, currentUser.roles is an array
      return currentUserRoles?.some((allowedRole) =>
        roles.includes(allowedRole)
      )
    } else if (typeof currentUserRoles === 'string') {
      // roles to check is an array, currentUser.roles is a string
      return roles.some((allowedRole) => currentUserRoles === allowedRole)
    }
  }

  // roles not found
  return false
}

export const requireAuth = ({ roles }: { roles?: AllowedRoles } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
