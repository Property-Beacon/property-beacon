import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'
import { Head } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi'
import { QUERY } from 'src/components/AvatarCell'
import CompanyLogoCell from 'src/components/CompanyLogoCell'
import StatCard from 'src/components/StatCard'
import type { GetUserById, GetUserByIdVariables, User } from 'web/types/graphql'

const DashboardPage = () => {
  const { hasRole, currentUser } = useAuth()
  const { watchQuery } = useApolloClient()
  const [user, setUser] = useState<User | undefined>()

  useEffect(
    () => {
      if (hasRole(['ADMIN', 'CUSTOMER', 'CLIENT'])) {
        watchQuery<GetUserById, GetUserByIdVariables>({
          query: QUERY,
          variables: { id: currentUser?.id },
          fetchPolicy: 'cache-first',
          nextFetchPolicy: 'cache-first'
        }).subscribe(({ data: { user } }) => {
          setUser(user)
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="grid grid-cols-5">
        <div className="card shadow-lg bg-base-100 col-span-full lg:col-span-4">
          <div className="card-body">
            <div className="card-title border-b border-base-200">
              Welcome back {user?.profile?.fullName}
            </div>
            <div className="flex flex-col md:flex-row">
              <StatCard
                title="Booking"
                number={1299}
                variant="success"
                to={routes.home()}
                className="flex-1 mb-4 md:mb-0 md:mr-4"
              >
                <div className="text-success flex place-items-center">
                  <BiTrendingUp />
                  <span className="text-xs ml-1">10% more</span>
                </div>
              </StatCard>
              <StatCard
                title="Incidents"
                number={10}
                variant="info"
                to={routes.home()}
                className="flex-1 mb-4 md:mb-0 md:mr-4"
              >
                3 has no booking yet
              </StatCard>
              <StatCard
                title="Enforcements"
                number={10}
                variant="error"
                to={routes.home()}
                className="flex-1"
              >
                <div className="text-error flex place-items-center">
                  <BiTrendingDown />
                  <span className="text-xs ml-1">1% less</span>
                </div>
              </StatCard>
            </div>
          </div>
        </div>
        {!!user?.profile?.companyId && (
          <div className="hidden lg:block w-48 h-48 mx-auto ml-8">
            <CompanyLogoCell id={user.profile.companyId} />
          </div>
        )}
      </div>
    </>
  )
}

export default DashboardPage
