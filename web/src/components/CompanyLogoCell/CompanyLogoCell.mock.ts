import type { Company } from 'web/types/graphql'

// Define your own mock data here:
export const standard = (input?: Partial<Company>) => {
  const dateStr = new Date().toLocaleString()

  return {
    company: (input
      ? input
      : {
          id: 'a3f08caa-e057-11eb-ba80-0242ac130004',
          name: 'Test Company',
          displayName: 'Test Company Pty Ltd',
          shortName: 'TC',
          website: 'https://company.domain.com',
          logo: 'https://cdn.filestackcontent.com/fpWIVZz7RSSdjY4pn5YP',
          updatedAt: dateStr,
          createdAt: dateStr
        }) as Company
  }
}
