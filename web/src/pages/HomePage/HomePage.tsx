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
import { Head } from '@redwoodjs/web'
import { RPCError, RPCErrorCode } from 'magic-sdk'
import { BiCalendarEdit, BiCheckShield } from 'react-icons/bi'
import { RiSearchEyeLine } from 'react-icons/ri'

const HomePage = () => {
  const { loading, logIn, hasError, error, isAuthenticated } = useAuth()

  const onSubmit = async (data: { email: string }) => {
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
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="home">
        <div className="flex flex-col lg:flex-row items-center lg:px-10">
          <div className="flex-1 text-center lg:text-left lg:py-20">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Property signage compliance,
            </h1>
            <h1 className="mb-5 text-4xl sm:text-5xl font-bold">Instantly</h1>
            <p className="mb-10 text-lg text-gray-500">
              A intuitive way to regulate and monitor property signage activity
              within the council’s zone for the community.
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
            {!isAuthenticated && (
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto lg:ml-auto lg:mr-0">
                <Form onSubmit={onSubmit}>
                  {hasError && <FormError error={error} />}
                  <div className="card-body">
                    <div className="form-control">
                      <Label name="email" className="label text-xs">
                        Hassle-free with our secure passwordless login
                      </Label>
                      <EmailField
                        name="email"
                        disabled={loading}
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
                        disabled={loading}
                        className={`btn btn-primary ${
                          loading ? 'loading' : ''
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
              <h2 className="card-title">Participation</h2>
              <p className="font-light text-sm">
                Members of the community can participate in monitoring property
                signage via the Property Beacon app. They can earn income and in
                turn produce income for their council community.
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
              <h2 className="card-title">Compliance</h2>
              <p className="font-light text-sm">
                Council registers on Property Beacon platform for aggregating,
                analyzing, verifying signage records and enforces compliance.
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
                Simple platform for agents to check regulations and book signage
                activity for all sale and lease property promotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
