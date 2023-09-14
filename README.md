# Stencil App README

This is a RedwoodJS application with full-stack capabilities, including a frontend, backend, and database, containerized using Docker.

## Meta

|            |                                                                                                                              |
|------------|------------------------------------------------------------------------------------------------------------------------------|
| Name       | `stencil`                                                                                                            |
| Description| RedwoodJS application that provides web and API services.                                                                     |
| Workflow   | ![CI/CD Pipeline](https://github.com/ibraheem4/redwood-docker/actions/workflows/main.yml/badge.svg)                           |
| Maintainer | [Ibraheem Abdul-Malik](https://github.com/ibraheme4)                                                                         |

## Packages

| Name  | Runtime       |
|-------|--------------|
| api   | `node:18-alpine` |
| web   | `nginx:alpine`   |

## Benchmark

Benchmark on running averages

| Package | Build time | Image size |
|---------|------------|------------|
| api     | `~554s`    | `1.32GB`   |
| web     | `~554s`    | `43.6MB`   |

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

## Installation

1. Clone the repository or download the source code.
2. Open a terminal or command prompt and navigate to the project directory.
3. Duplicate the .env.example file and create a new file named .env to customize your actual configuration details with:

   ```bash
   make setup-env
   ```

4. Find and replace any instances of `FIXME`, `Stencil`, `stencil_`, `-stencil-`, `/template/`.

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

- **Run Storybook**:

  ```bash
  make storybook
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

### Accessing pgAdmin4

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

## Publishing Images to Docker Hub

Run the following commands to push images to Docker Hub:

```bash
make push-web
make push-api
```

Ensure you're logged into Docker Hub before pushing.

## Resources

- [RedwoodJS Documentation](https://redwoodjs.com)
- [Prisma Documentation](https://www.prisma.io)
- [Storybook Documentation](https://storybook.js.org)
- [Docker Documentation](https://docs.docker.com)
- [Node.js Documentation](https://nodejs.org/en/)
- [Yarn Documentation](https://yarnpkg.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
