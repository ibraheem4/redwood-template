# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

## Deployment on [Render.com](https://render.com)

The application is currently deployed on Render.com with the following services:

### Frontend
**redwood-tutorial-web-ovfn**
- Service: Static Site
- Environment: Static
- Location: Automatic

URL: [redwood-tutorial-web-ovfn.onrender.com](https://redwood-tutorial-web-ovfn.onrender.com)

### Backend
**redwood-tutorial-api-lvvq**
- Service: Web Service
- Environment: Node.js
- Location: Automatic

URL: [redwood-tutorial-api-lvvq.onrender.com](https://redwood-tutorial-api-lvvq.onrender.com)

### Database
- No explicit information was provided about the database service in the given README. Please refer to the Render.com dashboard for information on the deployed database.

Please note that the URLs provided above are subject to availability and may change depending on the Render.com deployment.


> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.

Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
yarn storybook (supports dark mode)
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)

## Using GraphQL in RedwoodJS

RedwoodJS offers a built-in GraphQL server that allows you to run queries and mutations on your API. During development, you can interact with your GraphQL server using the GraphQL Playground.

To start, run your RedwoodJS development server:

```bash
yarn rw dev
```

This will start your development server. By default, your API server runs at http://localhost:8911.

You can access the GraphQL Playground by navigating to http://localhost:8911/graphql in your web browser. Here, you can write and execute your GraphQL queries and mutations.

For example, given a posts query in your GraphQL schema, you could run:

```graphql
query {
  posts {
    id
    title
    body
  }
}
```
Click the "Play" button or press `Ctrl-Enter` to execute the query. The results will appear in the right-hand panel.

Remember that the queries and mutations you can run are dictated by your GraphQL schema, which is defined in the `api/src/graphql` directory of your RedwoodJS project.

Please note that the GraphQL Playground is disabled in production by default for security reasons. It can be enabled by setting api.proxy.playground to true in your `redwood.toml` file, but be aware that this could expose your API to potential security risks.

## Using Prisma Studio with RedwoodJS

Prisma Studio is a powerful database tool that lets you visually interact with your database. You can view data, run queries, and make changes.

Start Prisma Studio by running:

```bash
yarn rw prisma studio
```

This command opens Prisma Studio in a new browser tab.

Each table in your database is displayed as a separate tab in Prisma Studio. Click on a tab to view the data in that table. You can run queries by clicking the "Filter" button and entering a query to filter the data in the table. To edit a record, click on it to open the editing panel, and click "Save" when you're done.

Keep your Prisma schema in sync with your RedwoodJS schema, and run database migrations when you change your schema. This ensures Prisma Studio has the latest structure of your database.

## Restarting

```
yarn
yarn rw g secret # add SESSION_SECRET to .env
yarn rw prisma migrate dev # runs yarn rw prisma db seed
yarn rw dev
```

## Enhancements

 - Use TypeScript
 - Pre-commit lint
 - Pre-push test
 - Add commitlint
 - Add missing tests and storybook from Redwood tutorial intermission
 - Setup Postgres
 - Setup i18n including RTL support
 - Use UUID instead of Int
 - Add i18n support for Storybook
 - Add Dark mode support for Storybook
 - Add padding in Storybook
 - Add Pagination
