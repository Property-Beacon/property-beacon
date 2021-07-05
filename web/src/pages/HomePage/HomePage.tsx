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
import { BiCalendarEdit, BiCheckShield } from 'react-icons/bi'
import { RiSearchEyeLine } from 'react-icons/ri'

const HomePage = () => {
  const { loading, logIn, hasError, error, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(loading)

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
    <div className="home">
      <div className="flex flex-col lg:flex-row items-center lg:px-10">
        <div className="flex-1 text-center lg:text-left lg:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold">Property signage,</h1>
          <h1 className="mb-5 text-4xl sm:text-5xl font-bold">Instantly</h1>
          <p className="mb-10 text-lg text-gray-500">
            Monitoring, enforcing and booking property signage in few clicks. By
            the community, for the community. Your Gateway to the broader
            audiences in the community.
          </p>
          <Link
            className="btn btn-primary"
            to={isAuthenticated ? routes.dashboard() : routes.home()}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Link>
        </div>
        <div className="m-5"></div>
        <div className="login-box">
          {!loading && !isAuthenticated && (
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto lg:ml-auto lg:mr-0">
              <Form onSubmit={onSubmit}>
                {hasError && <FormError error={error} />}
                <div className="card-body">
                  <div className="form-control">
                    <Label name="email" className="label text-xs">
                      Hassle-free with our secured passwordless login
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
                      className={`btn btn-primary ${
                        isLoading ? 'loading' : ''
                      }`}
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
      <div className="flex flex-col lg:flex-row items-center justify-center mt-20">
        <div className="card">
          <figure className="px-10 pt-10 text-primary">
            <RiSearchEyeLine size={80} />
          </figure>
          <div className="badge mx-auto badge-primary text-xs mt-2">
            Community
          </div>
          <div className="card-body">
            <h2 className="card-title">Monitoring</h2>
            <p className="font-light text-sm">
              Community is the best resource for councils to monitor illegal
              usages of property signage on the council land. Just take a photo
              then upload to Property Beacon to get rewards, simple as that.
            </p>
          </div>
        </div>
        <div className="m-7"></div>
        <div className="card">
          <figure className="px-10 pt-10 text-primary">
            <BiCheckShield size={80} />
          </figure>
          <div className="badge mx-auto badge-primary text-xs mt-2">
            Council
          </div>
          <div className="card-body">
            <h2 className="card-title">Enforcing</h2>
            <p className="font-light text-sm">
              Property Beacon deals with all the tedious works for the councils,
              aggregating, analyzing and verifying the reported data from the
              community, councils just need to click a button to enforce.
            </p>
          </div>
        </div>
        <div className="m-7"></div>
        <div className="card">
          <figure className="px-10 pt-10 text-primary">
            <BiCalendarEdit size={80} />
          </figure>
          <div className="badge mx-auto badge-primary text-xs mt-2">
            Real Estate Agent
          </div>
          <div className="card-body">
            <h2 className="card-title">Booking</h2>
            <p className="font-light text-sm">
              Never been this easy for real estate agent to check regulations
              and book signage with the relevant local council, do everything in
              one place. The best way to campaign and reach out broader audience
              in the community via Property Beacon.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
