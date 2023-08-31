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
cp .env.example .env
```

Replace any instances of `FIXME` in the `.env` file.

## Using Makefile for Development and Production

This project includes a Makefile that simplifies various Docker-related tasks.

- **Build the Development Environment**:

  ```bash
  make build-dev
  ```

- **Start the Development Environment**:

  ```bash
  make up-dev
  ```

- **Stop the Development Environment**:

  ```bash
  make down-dev
  ```

- **Clean Up the Development Environment**:

  ```bash
  make clean
  ```

- **Build the Production Environment**:

  ```bash
  make build-prod
  ```

- **Start the Production Environment**:

  ```bash
  make up-prod
  ```

- **Stop the Production Environment**:

  ```bash
  make down-prod
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
- [Docker Documentation](https://docs.docker.com)
- [Node.js Documentation](https://nodejs.org/en/)
- [Yarn Documentation](https://yarnpkg.com/)
