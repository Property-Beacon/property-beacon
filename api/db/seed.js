/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')

const dotenv = require('dotenv')
dotenv.config()

const db = new PrismaClient()

/*
 * Seed data is database data that needs to exist for your app to run.
 *
 * @see https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-reset
 * @see https://www.prisma.io/docs/guides/prisma-guides/seed-database
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
 */
async function main() {
  const data = [
    {
      user: {
        email: 'ralphbliu@gmail.com',
        role: 'ADMIN',
        issuer: 'did:ethr:0xf95Ff41F462Ad6FB53C9d6dF4b9389A3D60C9F35',
        profile: {
          firstName: 'Brian',
          lastName: 'Liu',
          mobile: '0412345678',
          phone: '0412345678',
          address: {
            country: 'Australia',
            state: 'NSW',
            postalCode: '2200'
          }
        }
      },
      company: {
        name: 'Property Beacon Pty',
        shortName: 'PB',
        website: 'https://property-beacon.netlify.app/',
        profile: {
          fullName: 'Brian Property Beacon Pty Ltd',
          address: {
            country: 'Australia',
            state: 'NSW',
            postalCode: '2200'
          }
        }
      }
    }
  ]
  // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
  // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
  return Promise.all(
    data.map(
      async ({
        user: {
          profile: { address, ...profile },
          ...user
        },
        company: {
          profile: { address: companyProfileAddress, ...companyProfile },
          ...company
        }
      }) => {
        const _user = await db.user.create({
          data: user
        })
        const _userProfile = await db.userProfile.create({
          data: {
            userId: _user.id,
            ...profile
          }
        })
        const _userProfileAddress = await db.address.create({
          data: {
            userProfileId: _userProfile.id,
            ...address
          }
        })
        const _company = await db.company.create({
          data: company
        })

        await db.userProfile.update({
          data: {
            companyId: _company.id
          },
          where: {
            id: _userProfile.id
          }
        })
        const _companyProfile = await db.companyProfile.create({
          data: {
            companyId: _company.id,
            ...companyProfile
          }
        })
        const _companyProfileAddress = await db.address.create({
          data: {
            companyProfileId: _companyProfile.id,
            ...companyProfileAddress
          }
        })
        console.log(_user)
      }
    )
  )
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
