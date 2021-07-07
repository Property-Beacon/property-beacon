import { ReactNode, useEffect } from 'react'
import {
  AiOutlineBell,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineStop,
  AiOutlineWarning
} from 'react-icons/ai'
import { useMainLayoutContext } from './MainLayout'

export type AlertType = {
  level?: 'info' | 'success' | 'warning' | 'error'
  message?: string
  sticky?: boolean
  // Default 5 * 1000 (5s)
  timeout?: number
  // children for actions
  children?: ReactNode
}

const Alert = () => {
  const { alert, setAlert } = useMainLayoutContext()
  const alertLevelCls = alert?.level
    ? alert.level === 'error'
      ? 'alert-error'
      : alert.level === 'info'
      ? 'alert-info'
      : alert.level === 'success'
      ? 'alert-success'
      : alert.level === 'warning'
      ? 'alert-warning'
      : ''
    : ''

  useEffect(
    () => {
      if (alert && !alert.sticky) {
        setTimeout(() => {
          setAlert(null)
        }, alert.timeout ?? 5000)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [alert]
  )

  return (
    !!alert && (
      <div
        className={`alert ${alertLevelCls} absolute -top-20 mt-2 w-full z-10`}
      >
        <div className="flex-1 place-items-center">
          {alert.level === 'error' ? (
            <AiOutlineStop size={20} className="mr-1" />
          ) : alert.level === 'info' ? (
            <AiOutlineInfoCircle size={20} className="mr-1" />
          ) : alert.level === 'success' ? (
            <AiOutlineCheckCircle size={20} className="mr-1" />
          ) : alert.level === 'warning' ? (
            <AiOutlineWarning size={20} className="mr-1" />
          ) : (
            <AiOutlineBell size={20} className="mr-1" />
          )}
          <span>{alert.message}</span>
        </div>
        <div className="flex-none">{alert.children}</div>
      </div>
    )
  )
}

export default Alert
