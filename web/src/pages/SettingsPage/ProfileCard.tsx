import { RiInformationLine } from 'react-icons/ri'
import DateTimeString from 'src/components/DateTimeString'
import type { GetUserById } from 'web/types/graphql'

interface Props {
  user: GetUserById['user']
}

const ProfileCard = ({ user }: Props) => {
  return (
    <>
      <div className="flex gap-10 flex-col lg:flex-row lg:items-start mt-10">
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">Personal Information</div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th className="lg:w-48">Name</th>
                  <td className="text-sm">{user.profile?.fullName ?? '-'}</td>
                </tr>
                <tr>
                  <th className="lg:w-48">
                    Email
                    <div
                      data-tip="Contact us to change it"
                      className="tooltip tooltip-primary font-light"
                    >
                      <RiInformationLine
                        size={18}
                        className="text-primary align-text-bottom inline ml-0.5"
                      />
                    </div>
                  </th>
                  <td className="text-sm">{user.email}</td>
                </tr>
                <tr>
                  <th className="lg:w-48">
                    Role
                    <div
                      data-tip="TODO"
                      className="tooltip tooltip-primary font-light"
                    >
                      <RiInformationLine
                        size={18}
                        className="text-primary align-text-bottom inline ml-0.5"
                      />
                    </div>
                  </th>
                  <td className="text-sm">{user.role}</td>
                </tr>
                <tr>
                  <th className="lg:w-48">Last logged in</th>
                  <td className="text-sm">
                    <DateTimeString date={user.logOn} />
                  </td>
                </tr>
                {user.logOff ? (
                  <tr>
                    <th className="lg:w-48">Last logged off</th>
                    <td>
                      <DateTimeString date={user.logOff} />
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th className="lg:w-48">First Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. David"
                      className="input input-sm input-bordered w-full"
                      value={user.profile?.firstName}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Last Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. Jones"
                      className="input input-sm input-bordered w-full"
                      value={user.profile?.lastName}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Phone</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. +61400000000"
                      className="input input-sm input-bordered w-full"
                      value={user.profile?.phone}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Mobile</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. +61400000000"
                      className="input input-sm input-bordered w-full"
                      value={user.profile?.mobile}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">
              Address
              <span className="ml-1 text-gray-400 font-light text-sm">
                (Optional)
              </span>
            </div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th className="lg:w-48">Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. My house"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Street</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. 120/20 George St."
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Suburb</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. Sydney"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">State</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. NSW"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Postal code</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. 2200"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. Australia"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-10 text-right">
        <button className="btn btn-primary mr-2">Save</button>
        <button className="btn btn-ghost">Cancel</button>
      </div>
    </>
  )
}

export default ProfileCard
