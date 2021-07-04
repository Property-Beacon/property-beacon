import { RiInformationLine } from 'react-icons/ri'

interface Props {
  companyId: string
}

const OrganizationCard = ({ companyId: _ }: Props) => {
  return (
    <>
      <div className="flex gap-10 flex-col lg:flex-row lg:items-start mt-10">
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">Organization Information</div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th className="lg:w-48">Name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. NSW ECUMENICAL COUNCIL INC"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Short name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. NSW ECUMENICAL"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Display name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. NSW ECUMENICAL COUNCIL INC"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Full name</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. NEW SOUTH WALES ECUMENICAL COUNCIL INCORPORATED"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">
                    Registration No.
                    <div
                      data-tip="ABN | ACN"
                      className="tooltip tooltip-primary font-light"
                    >
                      <RiInformationLine
                        size={18}
                        className="text-primary align-text-bottom inline ml-0.5"
                      />
                    </div>
                  </th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. 64 781 737 080"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Email</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. example@domain.com"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Website</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. https://www.example.com"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Manager</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      className="input input-sm input-bordered w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Mayer</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      className="input input-sm input-bordered w-full"
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
                    />
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48">Fax</th>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g. +61400000000"
                      className="input input-sm input-bordered w-full"
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

export default OrganizationCard
