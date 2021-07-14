import { fireEvent, render, screen, waitFor } from '@redwoodjs/testing'
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

    expect(() => {
      screen.getByTestId('stat-card-link')
    }).toThrow()

    expect(screen.getByTestId('stat-card')).toMatchSnapshot()
    expect(screen.getByTestId('stat-card-title')).toHaveTextContent('Total')
    expect(screen.getByTestId('stat-card-number')).toHaveTextContent('999')
    expect(screen.getByTestId('stat-card-children')).toHaveTextContent(
      'description'
    )
  })

  it('renders clickable StatCard', async () => {
    const mockFn = jest.fn()

    render(
      <StatCard title="Count" number={99} to="#">
        This is clickable
      </StatCard>
    )

    const StatCardLink = screen.getByTestId('stat-card-link')

    expect(StatCardLink).toBeInTheDocument()
    expect(StatCardLink).toMatchSnapshot()
    expect(screen.getByTestId('stat-card-title')).toHaveTextContent('Count')
    expect(screen.getByTestId('stat-card-number')).toHaveTextContent('99')
    expect(screen.getByTestId('stat-card-children')).toHaveTextContent(
      'This is clickable'
    )

    StatCardLink.addEventListener('click', mockFn)

    fireEvent.click(screen.getByTestId('stat-card-link'))
    await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1))

    StatCardLink.removeEventListener('click', mockFn)
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
