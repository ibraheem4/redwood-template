# Stencil Auth0 App README

This is a RedwoodJS application with full-stack capabilities, including a frontend, backend, and database, containerized using Docker.

## Meta

|             |                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Name        | `stencil-auth0`                                                                                     |
| Description | RedwoodJS application that provides web and API services.                                           |
| Workflow    | ![CI/CD Pipeline](https://github.com/ibraheem4/redwood-docker/actions/workflows/main.yml/badge.svg) |
| Maintainer  | [Ibraheem Abdul-Malik](https://github.com/ibraheme4)                                                |

## Packages

| Name | Runtime                                                    |
| ---- | ---------------------------------------------------------- |
| api  | `public.ecr.aws/docker/library/node:18.17.1-bookworm-slim` |
| web  | `public.ecr.aws/nginx/nginx:1.19`                          |

## Benchmark

Benchmark on running averages

| Package | Build time | Image size |
| ------- | ---------- | ---------- |
| api     | `~772s`    | `1.45GB`   |
| web     | `~772s`    | `43.3MB`   |

## Suitable for

| Scenario                    | Development | Production |
| --------------------------- | ----------- | ---------- |
| Basic installation          | ✅          | ❌         |
| Preferably w/ LB/proxy      | ❌          | ❌         |
| High Availability           | ❌          | ❌         |
| Separation of concern       | ❌          | ❌         |
| Handles db migration & seed | ✅          | ❌         |

## Prerequisites

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js**: >=14.19.x <=16.x
- **Yarn**: >=1.15

## Installation and Setup (Containerized)

1. Clone the repository or download the source code.
2. Open a terminal or command prompt and navigate to the project directory.
3. Duplicate the .env.example file and create a new file named .env to customize your actual configuration details with:

   ```bash
   make setup-env-local
   make setup-env-docker
   ```

4. Find and replace any instances of `FIXME`, `Stencil Auth0`, `stencil_auth0_`, `stencil-auth0-`, `stencil-auth0`.

## Makefile Commands

This project includes a Makefile for managing various Docker-related tasks and more.

### Development Commands

- **Build the App**:

  ```bash
  make build
  ```

- **Start the App**:

  ```bash
  make up
  ```

- **Stop the App**:

  ```bash
  make down
  ```

> Storybook is a development environment for UI components. Open it at [http://localhost:7910](http://localhost:7910).

### Database and Testing Commands

- **Run Prisma Studio**:

  ```bash
  make prisma-studio
  ```

  > Prisma Studio is a visual editor for your database schema. Open it at [http://localhost:5555](http://localhost:5555).

- **Run Tests**:

  ```bash
  make test
  ```

- **Lint the Code**:

  ```bash
  make lint
  ```

- **Clean Up the Environment**:

  ```bash
  make clean && docker system prune -a
  ```

For additional Makefile commands, refer to the Makefile in the repository.

### Accessing pgAdmin4, storybook, and Prisma Studio

To manage your PostgreSQL databases, this setup includes a pgAdmin4 instance. Follow these steps to access it:

1. **Start the Docker Containers**:

   If you haven't already, make sure the Docker containers are running:

   ```bash
   make run
   ```

2. **Access pgAdmin4 Web Interface**:

   Open your web browser and go to [http://localhost:8080](http://localhost:8080).

3. **Login to pgAdmin4**:

   Use the email and password specified in the `compose.yml` file under the `pgadmin4` service (default is `admin@admin.com` and `admin`).

4. **Connect to PostgreSQL**:

   - **Hostname**: Use the service name for the PostgreSQL container (`db` or `test_db`).
   - **Port**: `5432`
   - **Username**: The value of `${POSTGRES_USER}` from your `.env` file (e.g. `postgres`).
   - **Password**: The value of `${POSTGRES_PASSWORD}` from your `.env` file (e.g. `password`).

Now you should be able to manage your databases using pgAdmin4.

### Accessing storybook and Prisma Studio

1. **Start the Docker Containers**:

   If you haven't already, make sure the Docker containers are running:

   ```bash
   make run
   ```

2. **Access storybook Web Interface**:

   Open your web browser and go to [http://localhost:7910](http://localhost:7910).

3. **Access Prisma Studio Web Interface**:

   Open your web browser and go to [http://localhost:5555](http://localhost:5555).

## AWS Copilot Deployment

This application is configured to be deployed using AWS Copilot. AWS Copilot simplifies containerized application deployments on AWS ECS (Elastic Container Service).

### Initial Setup

Before deploying with Copilot for the first time, you'll need to run the following commands:

Initialize the Application:

```bash
copilot app init stencil-auth0 --domain appratings.com
```

Initialize the Environment:

```bash
copilot env init --name test --app stencil-auth0 --profile default --default-config
```

Initialize Services:

Initialize the web and api services using the Copilot CLI. This will use the configurations from the Copilot manifest files.

```bash
copilot svc init --name web-service --svc-type "Backend Service" --dockerfile ./Dockerfile --port 8911
copilot svc init --name api-service --svc-type "Load Balanced Web Service" --dockerfile ./Dockerfile --port 8910
```

Deploy the Environment:

```bash
copilot env deploy --name test
```

Deploy Services:

Deploy the web and api services using the Copilot CLI. This will use the configurations from the Copilot manifest files.

```bash
copilot svc deploy --name web-service --env test
copilot svc deploy --name api-service --env test
```

### Adding a Database with AWS Copilot

To add an Aurora Serverless database to your application using AWS Copilot, follow these steps:

1. **Initialize Storage**:
   - Run `copilot storage init` and select "Aurora Serverless" as the storage type.
   - Choose a storage resource name (e.g., `api-cluster`).
   - Specify the initial database name (e.g., `appratings_db`).

2. **Update Environment Variables**:
   - Modify your service's manifest file to include the `APICLUSTER_SECRET` environment variable. This variable will contain the connection details for your Aurora Serverless database.

3. **Deploy the Database**:
   - Deploy the database using `copilot deploy --name [service-name]`. Replace `[service-name]` with the name of the service that requires access to the database.

### Subsequent Deployments

Once the initial setup is complete, you can manage subsequent deployments via the GitHub Actions workflow configured in the .github/workflows directory. This workflow will automatically build, tag, and push Docker images, and then deploy them using AWS Copilot.

### Deleting the Application

To delete the application, run the following commands:

```bash
copilot app delete stencil-auth0
```

## Installation and Setup (Non-Containerized)

This section provides instructions for running the application in a traditional, non-Docker setup.

### Prerequisites

- **Node.js**: >=14.19.x <=16.x
- **Yarn**: >=1.15
- **PostgreSQL**: >=9.5 (Optional, if you're not using a Dockerized database)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ibraheem4/redwood-docker.git
   ```

2. **Navigate to Project Directory**:

   ```bash
   cd stencil-auth0
   ```

3. **Set Up Environment Variables**:

   Duplicate the `.env.example` file and create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

   Then, find and replace any instances of `FIXME`, `Stencil DB Auth`, `stencil_auth0_`, `stencil-auth0-`, `stencil-auth0`.

4. **Install Dependencies**:

   ```bash
   yarn install --check-cache
   ```

5. **Database Setup**:

   If you are using a local PostgreSQL database, update the `.env` file with your database credentials. Then run:

   ```bash
   yarn rw prisma migrate dev
   ```

6. **Start Development Server**:

   ```bash
   yarn rw dev
   ```

### Development Commands (Non-Containerized)

If you're running the app without Docker, you can use the following yarn commands:

- **Start the App**:

  ```bash
  yarn rw dev
  ```

- **Run Tests**:

  ```bash
  yarn rw test
  ```

- **Lint the Code**:

  ```bash
  yarn rw lint
  ```

- **Database Migrations**:

  ```bash
  yarn rw prisma migrate dev
  ```

### Accessing Development Tools (Non-Containerized)

- **Prisma Studio**:

  Run the following command and access it at [http://localhost:5555](http://localhost:5555):

  ```bash
  yarn rw prisma studio
  ```

- **Storybook**:

  Start Storybook with the following command and access it at [http://localhost:7910](http://localhost:7910):

  ```bash
  yarn rw storybook
  ```

## Resources

- [RedwoodJS Documentation](https://redwoodjs.com)
- [Prisma Documentation](https://www.prisma.io)
- [Storybook Documentation](https://storybook.js.org)
- [Docker Documentation](https://docs.docker.com)
- [Node.js Documentation](https://nodejs.org/en/)
- [Yarn Documentation](https://yarnpkg.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
