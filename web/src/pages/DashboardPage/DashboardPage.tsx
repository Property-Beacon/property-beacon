import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi'
import StatCard from 'src/components/StatCard/StatCard'

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
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
    </div>
  )
}

export default DashboardPage
