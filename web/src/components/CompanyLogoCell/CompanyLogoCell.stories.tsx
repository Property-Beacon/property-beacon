import { Empty, Failure, Loading, Success } from './CompanyLogoCell'
import { standard } from './CompanyLogoCell.mock'

export const loading = () => {
  return Loading ? (
    <div className="flex place-items-center">
      <div className="h-10 w-10 mr-4">
        <Loading />
      </div>
      <div className="h-12 w-12 mr-4">
        <Loading />
      </div>
      <div className="h-14 w-14 mr-4">
        <Loading />
      </div>
      <div className="h-16 w-16">
        <Loading />
      </div>
    </div>
  ) : null
}

export const empty = () => {
  return Empty ? (
    <div className="flex place-items-center">
      <div className="h-10 w-10 mr-4">
        <Empty />
      </div>
      <div className="h-12 w-12 mr-4">
        <Empty />
      </div>
      <div className="h-14 w-14 mr-4">
        <Empty />
      </div>
      <div className="h-16 w-16">
        <Empty />
      </div>
    </div>
  ) : null
}

export const failure = () => {
  return Failure ? (
    <div className="flex place-items-center">
      <div className="h-10 w-10 mr-4">
        <Failure error={new Error('oh no')} />
      </div>
      <div className="h-12 w-12 mr-4">
        <Failure error={new Error('oh no')} />
      </div>
      <div className="h-14 w-14 mr-4">
        <Failure error={new Error('oh no')} />
      </div>
      <div className="h-16 w-16">
        <Failure error={new Error('oh no')} />
      </div>
    </div>
  ) : null
}

export const success = () => {
  return Success ? (
    <div className="flex place-items-center">
      <div className="h-10 w-10 mr-4">
        <Success
          {...standard({
            displayName: 'Display Name',
            id: 'a3f08caa-e057-11eb-ba80-0242ac130004'
          })}
        />
      </div>
      <div className="h-12 w-12 mr-4">
        <Success
          {...standard({
            name: 'Name',
            id: 'a3f08caa-e057-11eb-ba80-0242ac130004'
          })}
        />
      </div>
      <div className="h-14 w-14 mr-4">
        <Success
          {...standard({
            id: 'a3f08caa-e057-11eb-ba80-0242ac130004',
            shortName: 'Short name'
          })}
        />
      </div>
      <div className="h-16 w-16">
        <Success
          {...standard({
            id: 'a3f08caa-e057-11eb-ba80-0242ac130004',
            logo: 'https://cdn.filestackcontent.com/UnhjmzkSAIHvcLV4orQl'
          })}
        />
      </div>
    </div>
  ) : null
}

export default { title: 'Cells/CompanyLogoCell' }
