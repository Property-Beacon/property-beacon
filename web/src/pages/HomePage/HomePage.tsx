import { useEffect, useState } from 'react'

const HomePage = () => {
  const targetDate = new Date('2022-05-01').getTime()
  const [current, setCurrent] = useState(new Date(targetDate - Date.now()))

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(new Date(targetDate - Date.now()))
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center mt-40">
      <div className="flex flex-col p-2 rounded-box text-neutral-content">
        <span className="font-mono text-2xl countdown">
          <span style={{ '--value': current.getMonth() }}></span>
        </span>
        mos
      </div>
      <div className="flex flex-col p-2 rounded-box text-neutral-content">
        <span className="font-mono text-2xl countdown">
          <span style={{ '--value': current.getDay() }}></span>
        </span>
        days
      </div>
      <div className="flex flex-col p-2 rounded-box text-neutral-content">
        <span className="font-mono text-2xl countdown">
          <span style={{ '--value': current.getHours() }}></span>
        </span>
        hrs
      </div>
      <div className="flex flex-col p-2 rounded-box text-neutral-content">
        <span className="font-mono text-2xl countdown">
          <span style={{ '--value': current.getMinutes() }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 rounded-box text-neutral-content">
        <span className="font-mono text-2xl countdown">
          <span style={{ '--value': current.getSeconds() }}></span>
        </span>
        sec
      </div>
    </div>
  )
}

export default HomePage
