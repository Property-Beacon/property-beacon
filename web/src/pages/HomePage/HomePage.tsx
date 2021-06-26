import { useAuth } from '@redwoodjs/auth'
import {
  EmailField,
  FieldError,
  Form,
  FormError,
  Label,
  Submit
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { RPCError, RPCErrorCode } from 'magic-sdk'
import { useEffect, useState } from 'react'

const HomePage = () => {
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

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 sm:px-10">
      <div className="flex-1 text-center lg:text-left lg:py-20">
        <h1 className="mb-5 text-5xl font-bold">{document.title}</h1>
        <p className="mb-5 font-light">{description}</p>
        <Link
          className="btn btn-accent"
          to={isAuthenticated ? routes.dashboard() : routes.home()}
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
        </Link>
      </div>
      <div className="flex-1 justify-center">
        {!loading && !isAuthenticated && (
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
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
        )}
      </div>
    </div>
  )
}

export default HomePage
