# Property Beacon

<img src="web/public/images/icons/icon-72x72.png" alt="Property Beacon">

Property Beacon is an online platform that enables the booking, monitoring and enforcing of compliant property signage withing the Real Estate sector.

## Docs 📁

All technical 👨‍💻👩‍💻 documentations of Property Beacon

> Tech stack: yarn workspace, Node.js 14+, React 17+, RedwoodJS (Jamstack), Apollo GraphQL, Prisma, TailwindCSS

### Architecture 🏗️

- [Authentication](docs/AUTHENTICATION.md)
- Web
- API

### Coding conventions and standards

- [Fundamental](docs/FUNDAMENTAL.md) _(folder structure, naming conventions and etc)_
- React
- Typescript
- TailwindCSS
- GraphQL
- Prisma
- Postgres

## Getting Started 👨‍💻👩‍💻

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### `env` variables

You will need to add few `MagicLink` env variables first, [deep dive](docs/AUTHENTICATION.md)

```
touch .env
```

then add these two variables into `.env`

```
MAGICLINK_PUBLIC={askMeTheKey}
MAGICLINK_SECRET={askMeTheKey}
```

### Fire it up

```terminal
yarn redwood dev
```

This will launch both `web` and `api` by default and tour browser should open automatically to `http://localhost:8910` to see the web app.

> Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

## Reference

### RedwoodJS

- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood)
- [Docs](https://redwoodjs.com/docs/introduction) _using the Redwood Router, handling assets and files, list of command-line tools, and more_
- [Redwood Community](https://community.redwoodjs.com) _get help, share tips and tricks, and collaborate on everything about RedwoodJS_
