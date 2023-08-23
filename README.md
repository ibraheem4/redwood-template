# RedwoodJS App README

This is a RedwoodJS application with full-stack capabilities, including a frontend, backend, and database, containerized using Docker.

## Prerequisites

Before running this application, ensure that you have the following installed:

- **Docker**: The project uses Docker to containerize the application. [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js**: Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x).
- **Yarn**: Redwood requires [Yarn](https://yarnpkg.com/) (>=1.15).

## Installation

1. Clone the repository or download the source code.
2. Open a terminal or command prompt and navigate to the project directory.
3. Duplicate the .env.example file and create a new file named .env to customize your actual configuration details with:

   ```bash
   cp .env.example .env
   ```

4. Find and replace any instances of `FIXME`.

## Running the Application with Docker

### Development

1. **Building the Docker images** (only need to do this the first time or whenever there are changes):

   ```bash
   docker-compose -f docker-compose.dev.yml build
   ```

2. **Starting the Dockerized RedwoodJS application**:

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

   Access the web service at [http://localhost:8910](http://localhost:8910) and the API service at [http://localhost:8911](http://localhost:8911).

3. **Stopping the Dockerized RedwoodJS application**:

   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

#### Development Commands

These commands must be run within the appropriate Docker container. Replace `api` with the name of the container running your RedwoodJS application.

- **Generate a scaffold for a model**:

  ```bash
  docker-compose -f docker-compose.dev.yml exec api yarn redwood g scaffold post
  ```

- **Run Storybook for component design**:

  ```bash
  docker-compose -f docker-compose.dev.yml exec api yarn storybook
  ```

   Access the prisma studio service at [http://localhost:7910](http://localhost:7910).

> NOTE: Uses `yarn storybook` instead of `yarn rw storybook` in order to pass `IS_STORYBOOK=true` to the environment.

- **Test your application with Jest**:

  ```bash
  docker-compose -f docker-compose.dev.yml exec api yarn rw test
  ```

- **Linting**:

  ```bash
  docker-compose -f docker-compose.dev.yml exec api yarn rw lint
  ```

- **Automatically fix most linting errors**:

  ```bash
  docker-compose -f docker-compose.dev.yml exec api yarn rw lint --fix
  ```

#### Using Prisma Studio with RedwoodJS

Prisma Studio is a powerful database tool that lets you visually interact with your database:

1. **Start Prisma Studio by running**:

  ```bash
  docker-compose -f docker-compose.dev.yml exec api yarn rw prisma studio
  ```

   Access the prisma studio service at [http://localhost:5555](http://localhost:5555).

#### Database Migrations with Prisma

If you need to make changes to the database schema, use Prisma for migrations:

1. Modify the [`schema.prisma`](api/db/schema.prisma) file in `api/db`.
2. Run the following command to apply the migration:

   ```bash
   docker-compose -f docker-compose.dev.yml exec api yarn rw prisma migrate dev
   ```

### Production

1. **Building the Docker images** (only need to do this the first time or whenever there are changes):

   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Starting the Dockerized RedwoodJS application**:

    ```bash
    docker-compose -f docker-compose.prod.yml up
    ```

   Access the web service at [http://localhost:8910](http://localhost:8910) and the API service at [http://localhost:8911](http://localhost:8911).

3. **Stopping the Dockerized RedwoodJS application**:

   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

## Publishing Images to Docker Hub

   If you need to publish the updated Docker images to Docker Hub, you can use the following commands:

   ### Web Image

   ```bash
   docker build --target web -f Dockerfile.dev -t ibraheem4/docker-ibraheem4-nginx-web-dev:latest .
   docker push ibraheem4/docker-ibraheem4-nginx-web-dev:latest
   ```

   ### API Image

   ```bash
   docker build --target api -f Dockerfile.dev -t ibraheem4/docker-ibraheem4-redwood-api-dev:latest .
   docker push ibraheem4/docker-ibraheem4-redwood-api-dev:latest
   ```

   Make sure you're logged in to Docker Hub before pushing the images.

### `ibraheem4-nginx`

**Meta**
| | |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name | `ibraheem4-nginx` |
| Description | DESCRIPTION. |
| Workflow | BADGE |
| Maintainer | [Ibraheem Abdul-Malik](https://github.com/ibraheme4) |

**Packages**

| Name | Runtime          |
| ---- | ---------------- |
| api  | `node:18-alpine`  |
| web  | `nginx:alpine`   |

**Benchmark**

Benchmark on running averages

| Package | Build time | Image size |
| ------- | ---------- | ---------- |
| api     | `~Xm XXs`  | `1.35GB`    |
| web     | `~Xm XXs`  | `44.5MB`    |

> Image size is the size of the image after being built. `Docker images | egrep '^.*SIZE|docker\-.*' `

**Suitable for**

| Scenario                    | Development | Production |
| --------------------------- | ----------- | ---------- |
| Basic installation          | ✅          | ❌             |
| Preferably w/ LB/proxy      | ❌          | ❌         |
| High Availability           | ❌          | ❌         |
| Separation of concern       | ❌          | ❌         |
| Handles db migration & seed | ✅          | ❌         |

## Resources

- RedwoodJS Documentation: [https://redwoodjs.com](https://redwoodjs.com)
- Prisma Documentation: [https://www.prisma.io](https://www.prisma.io)
- Docker Documentation: [https://docs.docker.com](https://docs.docker.com)
- Node.js Documentation: [https://nodejs.org/en/](https://nodejs.org/en/)
- Yarn Documentation: [https://yarnpkg.com/](https://yarnpkg.com/)
