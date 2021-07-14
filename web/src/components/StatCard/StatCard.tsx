import { Link } from '@redwoodjs/router'
import type { FC, HTMLAttributes, ReactNode } from 'react'

type BaseProps = {
  variant?: ColorVariant
  title: ReactNode
  number: ReactNode
  numberFormatOptions?: Intl.NumberFormatOptions
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>

const Base: FC<BaseProps> = ({
  variant = 'neutral',
  children,
  title,
  number,
  numberFormatOptions,
  className,
  ...rest
}) => {
  const numberFormatter = new Intl.NumberFormat(
    navigator.language,
    numberFormatOptions
  )
  const [textColor, borderColor] =
    variant === 'primary'
      ? ['text-primary', 'border-primary']
      : variant === 'secondary'
      ? ['text-secondary', 'border-secondary']
      : variant === 'accent'
      ? ['text-accent', 'border-accent']
      : variant === 'info'
      ? ['text-info', 'border-info']
      : variant === 'success'
      ? ['text-success', 'border-success']
      : variant === 'warning'
      ? ['text-warning', 'border-warning']
      : variant === 'error'
      ? ['text-error', 'border-error']
      : ['text-neutral', 'border-neutral']

  return (
    <div
      data-testid="stat-card"
      className={`bg-base-200 rounded-lg p-4 shadow-md relative overflow-hidden ${className}`}
      {...rest}
    >
      <div
        className={`absolute h-full border-l-4 left-0 top-0 ${borderColor}`}
      />
      {typeof title === 'string' ? (
        <div className="opacity-50" data-testid="stat-card-title">
          {title}
        </div>
      ) : (
        title
      )}
      {typeof number === 'bigint' || typeof number === 'number' ? (
        <div className="text-xl font-extrabold" data-testid="stat-card-number">
          {numberFormatter.format(number)}
        </div>
      ) : (
        number
      )}
      {typeof children === 'string' ? (
        <div
          data-testid="stat-card-children"
          className={`${textColor} text-xs`}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

interface Props extends BaseProps {
  to?: string
}

const StatCard: FC<Props> = ({ to, className, ...rest }) => {
  return to ? (
    <Link to={to} className={className} data-testid="stat-card-link">
      <Base {...rest} className="hover:bg-base-300" />
    </Link>
  ) : (
    <Base {...rest} className={className} />
  )
}

export default StatCard
