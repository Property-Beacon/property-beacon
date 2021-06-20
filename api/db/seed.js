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
  // return await db.userProfile.update({
  //   data: {
  //     companyId: '654c5ae1-0086-441f-936c-c1aa5897ff9e'
  //   },
  //   where: {
  //     id: '18d92558-efb1-4145-9b4a-ba1d3867c84a'
  //   }
  // })
  // const data = [
  //   {
  //     email: 'ralphbliu@gmail.com',
  //     role: 'ADMIN',
  //     issuer: 'did:ethr:0xf95Ff41F462Ad6FB53C9d6dF4b9389A3D60C9F35',
  //     profile: {
  //       firstName: 'Brian',
  //       lastName: 'Liu',
  //       mobile: '0412345678',
  //       phone: '0412345678',
  //       address: {
  //         country: 'Australia',
  //         state: 'NSW',
  //         postalCode: '2200'
  //       },
  //       organisation: {
  //         name: 'Property Beacon Pty',
  //         shortName: 'PB',
  //         website: 'https://property-beacon.netlify.app/',
  //         profile: {
  //           owner: 'Brian Liu/Peter Mitrovich'
  //         }
  //       }
  //     }
  //   }
  // ]
  // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
  // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
  // return Promise.all(
  //   data.map(
  //     async ({
  //       profile: {
  //         address,
  //         organisation: { profile: companyProfile, ...organisation },
  //         ...userProfile
  //       },
  //       ...user
  //     }) => {
  //       const _user = await db.user.create({
  //         data: user
  //       })
  //       const _userProfile = await db.userProfile.create({
  //         data: {
  //           userId: _user.id,
  //           ...userProfile
  //         }
  //       })
  //       const _userProfileAddress = await db.address.create({
  //         data: {
  //           userProfileId: _userProfile.id,
  //           ...address
  //         }
  //       })
  //       const _userOrg = await db.company.create({
  //         data: {
  //           userProfileId: _userProfile.id,
  //           ...organisation
  //         }
  //       })
  //       const _userOrgProfile = await db.companyProfile.create({
  //         data: {
  //           companyId: _userOrg.id,
  //           ...companyProfile
  //         }
  //       })
  //       console.log(_user)
  //     }
  //   )
  // )
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
