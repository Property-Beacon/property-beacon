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
  const description = (
    document.head.querySelector('meta[name=description]') as HTMLMetaElement
  ).content
  const onSubmit = (data) => {
    // TODO GraphQL login API integration
    console.log(data)
  }

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="flex-col justify-center hero-content lg:flex-row">
        <img
          width={128}
          height={128}
          alt={title}
          loading="lazy"
          src="/images/icons/icon-512x512.png"
        />
        <div className="text-center lg:text-left">
          <h1 className="mb-5 text-5xl font-bold text-neutral">{title}</h1>
          <p className="mb-5 text-base-content text-opacity-60 font-light">
            {description}
          </p>
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
