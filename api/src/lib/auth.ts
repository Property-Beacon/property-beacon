import { Magic } from '@magic-sdk/admin'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/api'
import { logger } from 'src/lib/logger'
import {
  createUser,
  getUserByIssuer,
  updateUserByIssuer
} from 'src/services/user'
import { getUserProfile } from 'src/services/userProfile'

/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const getCurrentUser = async (_, { token }) => {
  const mAdmin = new Magic(process.env.MAGICLINK_SECRET)

  try {
    const { issuer, email } = await mAdmin.users.getMetadataByToken(token)
    const user = await getUserByIssuer({ issuer })
    const _user = user
      ? await updateUserByIssuer({
          issuer,
          data: { logOn: new Date() }
        })
      : await createUser({ data: { issuer, email } })
    const userProfile = await getUserProfile({ userId: _user.id })

    return { ..._user, roles: [_user.role], profile: userProfile }
  } catch (error) {
    logger.error(
      error,
      'Failed to get current user metadata via Magic admin SDK'
    )
  }
}

/**
 * TODO: RBAC
 *
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string=} roles - An optional role or list of roles
 * @param {string[]=} roles - An optional list of roles
 * @returns {boolean} - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ role } = {}) => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    typeof role === 'string' &&
    !context.currentUser.roles?.includes(role)
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    Array.isArray(role) &&
    !context.currentUser.roles?.some((r) => role.includes(r))
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
