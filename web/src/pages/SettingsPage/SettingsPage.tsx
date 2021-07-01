import { useAuth } from '@redwoodjs/auth'
import { HiOutlineIdentification } from 'react-icons/hi'
import { RiAdminLine } from 'react-icons/ri'
import AvatarCell from 'src/components/AvatarCell'

const SettingsPage = () => {
  const { currentUser } = useAuth()
  const createdAt = new Date(currentUser.createdAt)
  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
  const timeFormatter = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  })

  return (
    <div>
      <div className="w-24 h-24 mx-auto">
        <AvatarCell id={currentUser.id} />
      </div>
      <div className="stats shadow-lg w-full mt-6">
        <div className="stat place-items-center place-content-center">
          <div className="stat-title text-sm">User</div>
          <div className="stat-value text-lg">
            <HiOutlineIdentification size={28} />
          </div>
          <div className="stat-desc text-xs">{currentUser.email}</div>
        </div>
        <div className="stat place-items-center place-content-center">
          <div className="stat-title text-sm">Role</div>
          <div className="stat-value text-lg">
            <RiAdminLine size={28} />
          </div>
          <div className="stat-desc text-xs">{currentUser.role}</div>
        </div>
        <div className="stat place-items-center place-content-center">
          <div className="stat-title text-sm">Updated</div>
          <div className="stat-value text-lg">
            {dateFormatter.format(createdAt)}
          </div>
          <div className="stat-desc text-xs">
            {timeFormatter.format(createdAt)}
          </div>
        </div>
        <div className="stat place-items-center place-content-center">
          <div className="stat-title text-sm">Created</div>
          <div className="stat-value text-lg">
            {dateFormatter.format(createdAt)}
          </div>
          <div className="stat-desc text-xs ">
            {timeFormatter.format(createdAt)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
