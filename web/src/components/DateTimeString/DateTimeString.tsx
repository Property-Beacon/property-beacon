interface Props {
  date: Date | string
  locale?: string
  options?: Intl.DateTimeFormatOptions
}

const DateTimeString = ({ date, locale, options }: Props) => {
  const formatter = new Intl.DateTimeFormat(
    locale || navigator.language,
    options || {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }
  )

  return <>{formatter.format(new Date(date))}</>
}

export default DateTimeString
