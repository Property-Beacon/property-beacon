import { Empty, Failure, Loading, Success } from './CompanyLogoCell'
import { standard } from './CompanyLogoCell.mock'

export const loading = () => {
  return Loading ? (
    <div className="flex gap-4 place-items-center">
      <div className="h-10 w-10">
        <Loading />
      </div>
      <div className="h-12 w-12">
        <Loading />
      </div>
      <div className="h-14 w-14">
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
    <div className="flex gap-4 place-items-center">
      <div className="h-10 w-10">
        <Empty />
      </div>
      <div className="h-12 w-12">
        <Empty />
      </div>
      <div className="h-14 w-14">
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
    <div className="flex gap-4 place-items-center">
      <div className="h-10 w-10">
        <Failure error={new Error('oh no')} />
      </div>
      <div className="h-12 w-12">
        <Failure error={new Error('oh no')} />
      </div>
      <div className="h-14 w-14">
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
    <div className="flex gap-4 place-items-center">
      <div className="h-10 w-10">
        <Success
          {...standard({
            displayName: 'Display Name',
            id: 'a3f08caa-e057-11eb-ba80-0242ac130004'
          })}
        />
      </div>
      <div className="h-12 w-12">
        <Success
          {...standard({
            name: 'Name',
            id: 'a3f08caa-e057-11eb-ba80-0242ac130004'
          })}
        />
      </div>
      <div className="h-14 w-14">
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
