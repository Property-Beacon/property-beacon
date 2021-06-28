import type { User } from 'api/types/graphql'

declare module 'csstype' {
  interface Properties {
    '--value'?: number
  }
}

declare module '@redwoodjs/auth' {
  interface CurrentUser extends User {}
}
