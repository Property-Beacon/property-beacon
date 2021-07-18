import { FiBarChart, FiRefreshCw } from 'react-icons/fi'
import StatCard from './StatCard'

export const variants = () => {
  return (
    <div className="flex">
      <StatCard title="Total submission" number={1000} className="mr-4">
        neutral (default)
      </StatCard>
      <StatCard
        title="Total submission"
        number={1000000}
        variant="primary"
        className="mr-4"
      >
        primary
      </StatCard>
      <StatCard
        title="Total submission"
        number={1000000000}
        variant="secondary"
      >
        secondary
      </StatCard>
      <StatCard
        title="Total submission"
        number={12.2}
        variant="accent"
        className="mr-4"
      >
        accent
      </StatCard>
      <StatCard
        title="Total submission"
        number={66.0}
        variant="info"
        className="mr-4"
      >
        info / 66.0
      </StatCard>
      <StatCard
        title="Total submission"
        number={345.678}
        variant="success"
        className="mr-4"
      >
        success
      </StatCard>
      <StatCard
        title="Total submission"
        number={123.1312321}
        variant="warning"
        className="mr-4"
      >
        warning / 123.1312321
      </StatCard>
      <StatCard title="Total submission" number={0.12345533364} variant="error">
        error / 0.12345533364
      </StatCard>
    </div>
  )
}

export const clickable = () => (
  <div className="flex">
    <StatCard
      to="#"
      variant="error"
      className="w-60"
      number={98765}
      title="Total submission"
    >
      This StatCard is clickable
    </StatCard>
  </div>
)

export const custom = () => {
  return (
    <div className="flex">
      <StatCard
        variant="success"
        title={
          <div className="flex place-items-center text-warning text-2xl">
            <FiBarChart />
            <span className="ml-1">Age group</span>
          </div>
        }
        number={
          <div className="text-5xl font-extrabold flex place-items-center mt-4 mb-8 text-primary">
            99999
            <button className="btn btn-accent btn-sm ml-2">
              <FiRefreshCw className="mr-2" />
              Refresh
            </button>
          </div>
        }
      >
        <div className="flex place-items-center">
          <div className="badge badge-outline">age range: 20~30</div>
        </div>
      </StatCard>
    </div>
  )
}

export default { title: 'Components/StatCard' }
