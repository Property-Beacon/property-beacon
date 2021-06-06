import { useEffect, useState } from 'react'
import {
  Form,
  Label,
  Submit,
  EmailField,
  FieldError,
  PasswordField
} from '@redwoodjs/forms'

const LoginPage = () => {
  const title = document.title
  const targetDate = new Date('2021-12-01').getTime()
  const [current, setCurrent] = useState(new Date(targetDate - Date.now()))
  const description = (
    document.head.querySelector('meta[name=description]') as HTMLMetaElement
  ).content
  const onSubmit = (data) => {
    // TODO GraphQL login API integration
    console.log(data)
  }

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(new Date(targetDate - Date.now()))
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="flex-col justify-center hero-content lg:flex-row">
        <img
          width={128}
          height={128}
          alt={title}
          loading="lazy"
          className="hidden sm:block"
          src="/images/icons/icon-512x512.png"
        />
        <div className="text-center lg:text-left">
          <h1 className="mb-5 text-5xl font-bold text-neutral">{title}</h1>
          <p className="mb-5 text-base-content text-opacity-60 font-light">
            {description}
          </p>
          <div className="grid grid-flow-col gap-1 auto-cols-max text-neutral justify-center lg:justify-start">
            <div className="flex flex-col p-2 rounded-box">
              <span className="font-mono countdown">
                <span style={{ '--value': current.getMonth() }}></span>
              </span>
              M
            </div>
            <div className="flex flex-col p-2 rounded-box ">
              <span className="font-mono countdown">
                <span style={{ '--value': current.getDay() }}></span>
              </span>
              D
            </div>
            <div className="flex flex-col p-2 rounded-box">
              <span className="font-mono countdown">
                <span style={{ '--value': current.getHours() }}></span>
              </span>
              h
            </div>
            <div className="flex flex-col p-2 rounded-box">
              <span className="font-mono countdown">
                <span style={{ '--value': current.getMinutes() }}></span>
              </span>
              m
            </div>
            <div className="flex flex-col p-2 rounded-box">
              <span className="font-mono countdown">
                <span style={{ '--value': current.getSeconds() }}></span>
              </span>
              s
            </div>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <Form onSubmit={onSubmit}>
            <div className="card-body">
              <div className="form-control">
                <Label name="email" className="label">
                  <span className="label-text">Email</span>
                </Label>
                <EmailField
                  name="email"
                  className="input input-bordered"
                  placeholder="example@domain.com"
                  errorClassName="input input-bordered input-error"
                  validation={{
                    required: true,
                    pattern: {
                      value: /[^@]+@[^\.]+\..+/
                    }
                  }}
                />
                <FieldError
                  name="email"
                  className="mt-1 label-text-alt text-error"
                />
              </div>
              {/* <div className="text-right">
                <a
                  href="/forgot-password"
                  className="label-text-alt link-accent"
                >
                  Forgot email?
                </a>
              </div> */}
              <div className="form-control">
                <Label name="password" className="label">
                  <span className="label-text">Password</span>
                </Label>
                <PasswordField
                  name="password"
                  className="input input-bordered"
                  errorClassName="input input-bordered input-error"
                  validation={{
                    required: true
                  }}
                />
                <FieldError
                  name="password"
                  className="mt-1 label-text-alt text-error"
                />
              </div>
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="label-text-alt link-accent"
                >
                  Forgot password?
                </a>
              </div>
              <div className="form-control mt-6">
                <Submit className="btn btn-accent">Login</Submit>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="/forgot-password"
                  className="label-text-alt link-accent"
                >
                  Create account
                </a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
