import { render, screen } from '@redwoodjs/testing'
import { FiBarChart, FiRefreshCw } from 'react-icons/fi'
import StatCard from './StatCard'

describe('StatCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <StatCard title="Total" number={999}>
          description
        </StatCard>
      )
    }).not.toThrow()

    expect(screen.getByTestId('stat-card')).toMatchSnapshot()
    expect(screen.getByTestId('stat-card-title')).toHaveTextContent('Total')
    expect(screen.getByTestId('stat-card-number')).toHaveTextContent('999')
    expect(screen.getByTestId('stat-card-children')).toHaveTextContent(
      'description'
    )
  })

  it('renders StatCard with custom title, number and children', () => {
    render(
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
    )

    expect(() => {
      screen.getByTestId('stat-card-title')
    }).toThrow()
    expect(() => {
      screen.getByTestId('stat-card-number')
    }).toThrow()
    expect(() => {
      screen.getByTestId('stat-card-children')
    }).toThrow()

    expect(screen.getByText('Age group')).toBeInTheDocument()
    expect(screen.getByText('99999')).toBeInTheDocument()
    expect(screen.getByText('age range: 20~30')).toBeInTheDocument()
  })
})
