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
3. Run the following command to install dependencies:

   ```bash
   yarn install
   ```

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

- **Start the development server**:

  ```bash
  yarn redwood dev
  ```

- **Generate a scaffold for a model**:

  ```bash
  yarn redwood g scaffold post
  ```

- **Run Storybook for component design**:

  ```bash
  yarn rw storybook
  ```

- **Test your application with Jest**:

  ```bash
  yarn rw test
  ```

- **Set up deployment with various targets**:

  ```bash
  yarn rw setup deploy --help
  ```

## Deployment with Docker

Deploying the RedwoodJS application using Docker can be done with various container orchestration services. Below are the general steps to deploy the Dockerized application:

1. **Push the Docker images to a container registry**:

   ```bash
   docker-compose push
   ```

2. **Use an orchestration tool like Kubernetes or Docker Swarm to deploy the services**.

   Detailed instructions will vary depending on the platform and orchestration tool used.

## Testing

RedwoodJS integrates Jest for testing both the frontend and backend:

- **Run tests across the whole application**:

  ```bash
  yarn rw test
  ```

- **Generate test files for new components and services**:

  ```bash
  yarn rw g test <component-or-service-name>
  ```

> Open the test results in your terminal or configure a continuous integration (CI) system to run the tests automatically.

## Linting

RedwoodJS follows standard linting rules, and you can run the linter to check for code style issues:

- **Run the ESLint linter across the whole project**:

  ```bash
  yarn rw lint
  ```

- **Automatically fix most linting errors**:

  ```bash
  yarn rw lint --fix
  ```

## Using Prisma Studio with RedwoodJS

Prisma Studio is a powerful database tool that lets you visually interact with your database:

1. **Start Prisma Studio by running**:

   ```bash
   yarn rw prisma studio
   ```

2. **Interact with your database**:

   This command opens Prisma Studio in a new browser tab, allowing you to view data, run queries, and make changes.

> Keep your Prisma schema in sync with your RedwoodJS schema, and run database migrations when you change your schema.

## Database Migrations with Prisma

If you need to make changes to the database schema, use Prisma for migrations:

1. Modify the [`schema.prisma`](api/db/schema.prisma) file in `api/db`.
2. Run the following command to apply the migration:

   ```bash
   yarn rw prisma migrate dev
   ```

## Resources

- RedwoodJS Documentation: [https://redwoodjs.com](https://redwoodjs.com)
- Prisma Documentation: [https://www.prisma.io](https://www.prisma.io)
- Docker Documentation: [https://docs.docker.com](https://docs.docker.com)
- Node.js Documentation: [https://nodejs.org/en/](https://nodejs.org/en/)
- Yarn Documentation: [https://yarnpkg.com/](https://yarnpkg.com/)
