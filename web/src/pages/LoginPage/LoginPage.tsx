import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { RPCError, RPCErrorCode } from 'magic-sdk'
import { routes, useParams, Redirect } from '@redwoodjs/router'
import {
  Form,
  Label,
  Submit,
  FormError,
  EmailField,
  FieldError
} from '@redwoodjs/forms'

const LoginPage = () => {
  // TODO: temporary before v1 release to be removed
  const targetDate = new Date('2021-12-01').getTime()
  const [current, setCurrent] = useState(new Date(targetDate - Date.now()))

  const { redirectTo = routes.home() } = useParams()
  const { loading, logIn, hasError, error, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(loading)
  const description = (
    document.head.querySelector('meta[name=description]') as HTMLMetaElement
  ).content

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true)

    logIn(data)
      .then()
      .catch((error) => {
        console.error(error)

        if (error instanceof RPCError) {
          switch (error.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              // TODO logging
              break
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  // TODO: temporary before v1 release to be removed
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(new Date(targetDate - Date.now()))
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  if (isAuthenticated) {
    return <Redirect to={redirectTo} />
  }

  return (
    <div className="hero min-h-screen">
      <div className="flex-col justify-center hero-content lg:flex-row">
        <img
          width={128}
          height={128}
          loading="lazy"
          alt={document.title}
          className="hidden sm:block"
          src="/images/icons/icon-512x512.png"
        />
        <div className="text-center lg:text-left">
          <h1 className="mb-5 text-5xl font-bold">{document.title}</h1>
          <p className="mb-5 font-light">{description}</p>
          <div className="grid grid-flow-col gap-1 auto-cols-max justify-center lg:justify-start">
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
        <div className="card flex-shrink-0 w- full max-w-sm shadow-2xl bg-base-100">
          <Form onSubmit={onSubmit}>
            {hasError && <FormError error={error} />}
            <div className="card-body">
              <div className="form-control">
                <Label name="email" className="label">
                  <span className="text-xs">
                    Hassle-free with our secured passwordless login
                  </span>
                </Label>
                <EmailField
                  name="email"
                  disabled={isLoading}
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
              <div className="form-control mt-6">
                <Submit
                  disabled={isLoading}
                  className={`btn btn-accent ${isLoading ? 'loading' : ''}`}
                >
                  Sign in
                </Submit>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
