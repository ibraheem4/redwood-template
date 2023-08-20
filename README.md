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

## Running the Application with Docker

1. **Building the Docker images** (only need to do this the first time or whenever there are changes):

   ```bash
   docker-compose build
   ```

2. **Starting the Dockerized RedwoodJS application**:

   ```bash
   docker-compose up
   ```

   > Access the web service at [http://localhost:8910](http://localhost:8910) and the API service at [http://localhost:8911](http://localhost:8911).

3. **Stopping the Dockerized RedwoodJS application**:

   ```bash
   docker-compose down
   ```

### Development Commands

These commands must be run within the appropriate Docker container. Replace `web` with the name of the container running your RedwoodJS application.

- **Start the development server**:

  ```bash
  docker-compose exec web yarn redwood dev
  ```

- **Generate a scaffold for a model**:

  ```bash
  docker-compose exec web yarn redwood g scaffold post
  ```

- **Run Storybook for component design**:

  ```bash
  docker-compose exec web yarn rw storybook
  ```

- **Test your application with Jest**:

  ```bash
  docker-compose exec web yarn rw test
  ```

- **Linting**:

  ```bash
  docker-compose exec web yarn rw lint
  ```

- **Automatically fix most linting errors**:

  ```bash
  docker-compose exec web yarn rw lint --fix
  ```

## Using Prisma Studio with RedwoodJS

Prisma Studio is a powerful database tool that lets you visually interact with your database:

1. **Start Prisma Studio by running**:

   ```bash
   docker-compose exec web yarn rw prisma studio
   ```

## Database Migrations with Prisma

If you need to make changes to the database schema, use Prisma for migrations:

1. Modify the [`schema.prisma`](api/db/schema.prisma) file in `api/db`.
2. Run the following command to apply the migration:

   ```bash
   docker-compose exec web yarn rw prisma migrate dev
   ```

## Resources

- RedwoodJS Documentation: [https://redwoodjs.com](https://redwoodjs.com)
- Prisma Documentation: [https://www.prisma.io](https://www.prisma.io)
- Docker Documentation: [https://docs.docker.com](https://docs.docker.com)
- Node.js Documentation: [https://nodejs.org/en/](https://nodejs.org/en/)
- Yarn Documentation: [https://yarnpkg.com/](https://yarnpkg.com/)
