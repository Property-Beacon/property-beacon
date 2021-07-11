import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi'
import { QUERY } from 'src/components/AvatarCell'
import CompanyLogoCell from 'src/components/CompanyLogoCell'
import StatCard from 'src/components/StatCard'
import type { GetUserById, GetUserByIdVariables } from 'web/types/graphql'

const DashboardPage = () => {
  const {
    hasRole,
    currentUser: { id }
  } = useAuth()
  const { watchQuery } = useApolloClient()
  const [companyId, setCompanyId] = useState<string | undefined>()

  useEffect(
    () => {
      if (hasRole(['ADMIN', 'CUSTOMER', 'CLIENT'])) {
        watchQuery<GetUserById, GetUserByIdVariables>({
          query: QUERY,
          variables: { id },
          fetchPolicy: 'cache-first',
          nextFetchPolicy: 'cache-first'
        }).subscribe(({ data: { user } }) => {
          setCompanyId(user?.profile?.companyId)
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="card shadow-lg bg-base-100 col-span-full lg:col-span-4">
        <div className="card-body">
          <div className="flex gap-4 flex-col md:flex-row">
            <StatCard
              title="Total Booking"
              number={1299}
              variant="success"
              className="md:w-40 md:box-content"
            >
              <div className="text-success flex place-items-center">
                <BiTrendingUp />
                <span className="text-xs ml-1">10% more</span>
              </div>
            </StatCard>
            <StatCard
              title="Total Incidents"
              number={10}
              variant="info"
              className="md:w-40 md:box-content"
            >
              3 has no booking yet
            </StatCard>
            <StatCard
              title="Total Enforcements"
              number={10}
              variant="error"
              className="md:w-40 md:box-content"
            >
              <div className="text-error flex place-items-center">
                <BiTrendingDown />
                <span className="text-xs ml-1">1% less</span>
              </div>
            </StatCard>
          </div>
        </div>
      </div>
      {!!companyId && (
        <div className="hidden lg:block w-48 h-48 mx-auto">
          <CompanyLogoCell id={companyId} />
        </div>
      )}
    </div>
  )
}

export default DashboardPage
