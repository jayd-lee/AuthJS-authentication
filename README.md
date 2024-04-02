# NextJS Auth boilerplate with AuthJS (NextAuth V5)

Key Features:
- Next-auth v5 (Auth.js)
- Next.js 14 with server actions
- Credentials Provider
- OAuth Provider
- Forgot password functionality
- Email verification
- Two factor verification
- User roles (Admin & User)
- Login, Register, Forgot password, Verification component, and Error page components
- Role Gate
- next.js middleware &  callbacks

### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```shell
git clone https://github.com/jayd-lee/AuthJS-boilerplate
```

### Install packages

```shell
pnpm i
```

### Setup .env file


```js
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma
```shell
pnpm dlx prisma generate
pnpm dlx prisma db push
```

### Start the app

```shell
pnpm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                                      |
| :-------------- | :----------------------------------------------- |
| `dev`           | Starts a development instance of the app         |
| `email`         | Starts a development preview interface for email |

