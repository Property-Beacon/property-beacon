import type { User } from 'api/types/graphql'
import type { Role } from 'web/types/graphql'

declare module 'csstype' {
  interface Properties {
    '--value'?: number
  }
}

declare module '@redwoodjs/auth' {
  interface CurrentUser extends Omit<User, 'profile'> {}
  interface AuthContextInterface {
    hasRole(role: Role | Role[]): boolean
  }
}

// TailwindCSS variants
declare global {
  type ColorVariant =
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
}
