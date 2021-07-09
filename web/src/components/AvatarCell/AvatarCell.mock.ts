import type { User } from 'web/types/graphql'

// Define your own mock data here:
export const standard = (input?: Partial<User>) => {
  const dateStr = new Date().toLocaleString()

  return {
    user: (input
      ? input
      : {
          id: 'a3f08caa-e057-11eb-ba80-0242ac130004',
          role: 'ADMIN',
          email: 'example@domain.com',
          logOn: dateStr,
          logOff: dateStr,
          createdAt: dateStr,
          profile: {
            id: '973cf2d6-e058-11eb-ba80-0242ac130004',
            userId: 'a3f08caa-e057-11eb-ba80-0242ac130004',
            companyId: null,
            avatar: 'https://cdn.filestackcontent.com/fpWIVZz7RSSdjY4pn5YP',
            firstName: 'David',
            lastName: 'Jones',
            phone: '0211112222',
            mobile: '0412345678',
            updatedAt: dateStr
          }
        }) as User
  }
}
