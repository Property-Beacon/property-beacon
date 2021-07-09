import { Empty, Failure, Loading, Success } from './AvatarCell'
import { standard } from './AvatarCell.mock'

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
            email: 'example@domain.com',
            profile: {
              id: '973cf2d6-e058-11eb-ba80-0242ac130004'
            }
          })}
        />
      </div>
      <div className="h-12 w-12">
        <Success
          {...standard({
            email: 'example@domain.com',
            profile: {
              id: '973cf2d6-e058-11eb-ba80-0242ac130004',
              firstName: 'David',
              lastName: 'Jones'
            }
          })}
        />
      </div>
      <div className="h-14 w-14">
        <Success
          {...standard({
            email: 'example@domain.com',
            profile: {
              id: '973cf2d6-e058-11eb-ba80-0242ac130004',
              avatar: 'https://cdn.filestackcontent.com/fpWIVZz7RSSdjY4pn5YP'
            }
          })}
        />
      </div>
      <div className="h-16 w-16">
        <Success
          {...standard({
            email: 'example@domain.com',
            profile: {
              id: '973cf2d6-e058-11eb-ba80-0242ac130004',
              avatar: 'https://cdn.filestackcontent.com/fpWIVZz7RSSdjY4pn5YP'
            }
          })}
        />
      </div>
    </div>
  ) : null
}

export default { title: 'Cells/AvatarCell' }
