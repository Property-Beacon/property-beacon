import { RiInformationLine } from 'react-icons/ri'
import DateTimeString from 'src/components/DateTimeString'
import type { GetUserById } from 'web/types/graphql'

interface Props {
  user: GetUserById['getUserById']
}

const ProfileCard = ({ user }: Props) => {
  return (
    <>
      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">Personal Information</div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{user.profile?.fullName ?? '-'}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>
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
                  <td>{user.role}</td>
                </tr>
                <tr>
                  <th>Last logged in</th>
                  <td>
                    <DateTimeString date={user.logOn} />
                  </td>
                </tr>
                {user.logOff ? (
                  <tr>
                    <th>Last logged off</th>
                    <td>
                      <DateTimeString date={user.logOff} />
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th>First Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input input-sm input-bordered"
                      value={user.profile?.firstName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input input-sm input-bordered"
                      value={user.profile?.lastName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Phone"
                      className="input input-sm input-bordered"
                      value={user.profile?.phone}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Mobile"
                      className="input input-sm input-bordered"
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
            <div className="card-title">Personal Address</div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex gap-10 flex-col lg:flex-row mt-10">
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">Organization</div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">Organization Address</div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
                <tr>
                  <th>country</th>
                  <td>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input input-sm input-bordered"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCard
