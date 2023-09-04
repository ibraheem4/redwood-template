# RedwoodJS App README

This is a RedwoodJS application with full-stack capabilities, including a frontend, backend, and database, containerized using Docker.

## Meta

|            |                                                                                                                              |
|------------|------------------------------------------------------------------------------------------------------------------------------|
| Name       | `ibraheem4-nginx`                                                                                                            |
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

```bash
git clone <repo_url>
cd <project_name>
make setup-env
```

Replace any instances of `FIXME` in the `.env` file.

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

### Database and Testing Commands

- **Run Prisma Studio**:

  ```bash
  make prisma-studio
  ```

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
