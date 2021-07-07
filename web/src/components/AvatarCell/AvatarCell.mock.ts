import type { GetUserById } from 'web/types/graphql'

type ProfileMock = Pick<
  GetUserById['user']['profile'],
  'firstName' | 'lastName' | 'avatar'
>
type UserMock = { email?: string; profile?: ProfileMock }

// Define your own mock data here:
export const standard = ({ email = '', profile = {} }: UserMock) =>
  ({
    user: {
      email,
      profile
    }
  } as GetUserById)
