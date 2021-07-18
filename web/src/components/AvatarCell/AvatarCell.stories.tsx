import { Empty, Failure, Loading, Success } from './AvatarCell'
import { standard } from './AvatarCell.mock'

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
            email: 'example@domain.com',
            profile: {
              id: '973cf2d6-e058-11eb-ba80-0242ac130004'
            }
          })}
        />
      </div>
      <div className="h-12 w-12 mr-4">
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
      <div className="h-14 w-14 mr-4">
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
