# GraphQL API

https://redwoodjs.com/docs/graphql

`api/src/graphql` is where we maintain all **GraphQL** schema and filename convention is `{name}.sdl.js`

```
├── api
│   └── src
│       └── graphql
│               ├── user.sdl.js
│               ├── userProfile.sdl.js
│               ├── company.sdl.js
│               ...
```

`name` has to be the same as your service filename, e.g.

```terminal
api/src/graphql/user.sdl.js
api/src/services/user/user.ts
```

## Create

Touch `user.sdl.js` under `api/src/graphql`

### Template (_code snippet_)

Open `user.sdl.js` in VSCode and type `rw:sdl` will automatically generates code snippet (skelton) for you

```graphql
export const schema = gql`
type Query {
}

type Mutation {
}

`
```

## Unit test

TODO
