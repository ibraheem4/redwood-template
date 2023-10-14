# Stencil Clerk App README

This is a RedwoodJS application with full-stack capabilities, including a frontend, backend, and database, containerized using Docker.

## Meta

|            |                                                                                                                              |
|------------|------------------------------------------------------------------------------------------------------------------------------|
| Name       | `stencil-dbauth`                                                                                                            |
| Description| RedwoodJS application that provides web and API services.                                                                     |
| Workflow   | ![CI/CD Pipeline](https://github.com/ibraheem4/redwood-docker/actions/workflows/main.yml/badge.svg)                           |
| Maintainer | [Ibraheem Abdul-Malik](https://github.com/ibraheme4)                                                                         |

## Packages

| Name  | Runtime       |
|-------|--------------|
| api   | `node:18-bookworm-slim` |
| web   | `nginx:alpine`   |

## Benchmark

Benchmark on running averages

| Package | Build time | Image size |
|---------|------------|------------|
| api     | `~772s`    | `1.45GB`   |
| web     | `~772s`    | `43.3MB`   |

## Suitable for

| Scenario                  | Development | Production |
|---------------------------|-------------|------------|
| Basic installation        | ✅          | ❌         |
| Preferably w/ LB/proxy    | ❌          | ❌         |
| High Availability         | ❌          | ❌         |
| Separation of concern     | ❌          | ❌         |
| Handles db migration & seed | ✅       | ❌         |

## Prerequisites

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js**: >=14.19.x <=16.x
- **Yarn**: >=1.15

## Installation (Containerized)

1. Clone the repository or download the source code.
2. Open a terminal or command prompt and navigate to the project directory.
3. Duplicate the .env.example file and create a new file named .env to customize your actual configuration details with:

   ```bash
   make setup-env
   ```

4. Find and replace any instances of `FIXME`, `Stencil DB Auth`, `stencil_dbauth_`, `stencil-dbauth-`, `stencil-dbauth`.

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

- **Start the App in Detached Mode**:

  ```bash
  make up-detached
  ```

- **Stop the App**:

  ```bash
  make down
  ```

- **Install Dependencies**:

  ```bash
  make install-deps
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
  make clean
  ```

For additional Makefile commands, refer to the Makefile in the repository.

### Accessing pgAdmin4, storybook, and Prisma Studio

To manage your PostgreSQL databases, this setup includes a pgAdmin4 instance. Follow these steps to access it:

1. **Start the Docker Containers**:

    If you haven't already, make sure the Docker containers are running:

    ```bash
    make run-local
    ```

2. **Access pgAdmin4 Web Interface**:

    Open your web browser and go to [http://localhost:8080](http://localhost:8080).

3. **Login to pgAdmin4**:

    Use the email and password specified in the `docker-compose.yml` file under the `pgadmin4` service (default is `admin@admin.com` and `admin`).

4. **Connect to PostgreSQL**:

    - **Hostname**: Use the service name for the PostgreSQL container (`db` or `test_db`).
    - **Port**: `5432`
    - **Username**: The value of `${POSTGRES_USER}` from your `.env` file.
    - **Password**: The value of `${POSTGRES_PASSWORD}` from your `.env` file.

Now you should be able to manage your databases using pgAdmin4.

### Accessing storybook and Prisma Studio

1. **Start the Docker Containers**:

    If you haven't already, make sure the Docker containers are running:

    ```bash
    make run-local
    ```

2. **Access storybook Web Interface**:

      Open your web browser and go to [http://localhost:7910](http://localhost:7910).

3. **Access Prisma Studio Web Interface**:

      Open your web browser and go to [http://localhost:5555](http://localhost:5555).

## Publishing Images to Docker Hub

Run the following commands to push images to Docker Hub:

```bash
make push-web
make push-api
```

Ensure you're logged into Docker Hub before pushing.

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
   cd stencil-dbauth
   ```

3. **Set Up Environment Variables**:

   Duplicate the `.env.example` file and create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

   Then, find and replace any instances of `FIXME`, `Stencil DB Auth`, `stencil_dbauth_`, `stencil-dbauth-`, `stencil-dbauth`.

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
