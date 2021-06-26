# Services

https://redwoodjs.com/docs/services.html#services

`api/src/services` is where we maintain business logic primarily map to **GraphQL** endpoints as resolvers but also can be reused in any other backend code (_i.e. anywhere under `api/`_), e.g. we used some `user` and `userProfile` functions in `api/src/lib/auth.ts`. If you [create a new GraphQL API endpoint](GRAPHQL.md), `redwood` will raise error and prompt you to create a new service (the same name) respectively.

> All services are secured by default which means authentication is required

```
├── api
│   └── src
│       └── services
│               ├── user
│               │    ├── user.ts
│               │    └── user.test.ts
│               ├── userProfile
│               │    ├── userProfile.ts
│               │    └── userProfile.test.ts
│               ...
```

## Create a service

A folder contains a service file with the same name is required to allow `redwood` to resolve for type checking. i.e.

```terminal
service1/service1.ts
```

### Template (_code snippet_)

Open `service1.ts` in VSCode and type `rw:service` will automatically generates code snippet (skelton) for you

```typescript
import { requireAuth } from 'src/lib/auth'

// Required by RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

// GraphQL resolver for composition fields (optional)
export const User = {}

export { beforeResolver }
// GraphQL API & services
export {}
// Services
export {}
```

### Secured service

This is required to ensure all services are secured

```typescript
// Required by RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}
```

you can also cherry-pick secured functions by passing `options` as 2nd parameter, [more](https://redwoodjs.com/docs/services.html#skipping-rules-with-only-and-except)

```typescript
function beforeResolver(rules) {
  rules.add(requireAuth, { only: ['createPost', 'deletePost'] })
}
```

### GraphQL resolvers

You can specify GraphQL `resolvers` based on the GraphQL schema. For example, `profile` is another table (`UserProfile`) in database, thus we will need to resolve `profile` field data by calling `getUserProfile` service.

```graphql
type User {
  id: String!
  role: Role!
  email: String!
  logOn: DateTime!
  logOff: DateTime
  profile: UserProfile!
  createdAt: DateTime!
}
```

```typescript
// GraphQL resolver for composition fields
export const User = {
  profile: (_, { root }) =>
    getUserProfile({
      userId: root.id
    })
}
```

### Export

Purely for readability purpose, we grouping export by usages to provide clear context for other developers.

```typescript
export { beforeResolver }
// GraphQL API & services
export {}
// Services
export {}
```

## Unit test

Writing unit test is essential and should only cover critical logic and scenarios since services mostly need to access database which means more tests could slow down build process. Thus only write tests

- the function is a simple SQL query but isn't covered by other scenarios
- it contains some business logic
- it contains database relation logic

```terminal
service1/service1.test.ts
```

### Template (_code snippet_)

Open `service1/service1.test.ts` in VSCode and type `rw:jest:service` will automatically generate `jest` snippet (skelton) based on its filename

```typescript
describe('services/user', () => {
  it('your test name', async () => {})
})
```

### Run

`api/src/services` unit test only

```bash
# api/src/services only
yarn rw test api services

# all api/ test
yarn rw test api
```
