# Stencil DBAuth App README

This is a RedwoodJS application with full-stack capabilities, including a frontend, backend, and database.

## Meta

|            |                                                                                                                              |
|------------|------------------------------------------------------------------------------------------------------------------------------|
| Name       | `stencil-dbauth`                                                                                                            |
| Description| RedwoodJS application that provides web and API services.                                                                     |
| Workflow   | ![CI/CD Pipeline](https://github.com/ibraheem4/redwood-stencil/actions/workflows/main.yml/badge.svg)                           |
| Maintainer | [Ibraheem Abdul-Malik](https://github.com/ibraheme4)                                                                         |

## Suitable for

| Scenario                  | Development | Production |
|---------------------------|-------------|------------|
| Basic installation        | ✅          | ❌         |
| Preferably w/ LB/proxy    | ❌          | ❌         |
| High Availability         | ❌          | ❌         |
| Separation of concern     | ❌          | ❌         |
| Handles db migration & seed | ✅       | ❌         |

## Prerequisites

- **Node.js**: >=14.19.x <=16.x
- **Yarn**: >=1.15

## Installation and Setup

This section provides instructions for running the application in a traditional, non-Docker setup.

### Prerequisites

- **Node.js**: >=14.19.x <=16.x
- **Yarn**: >=1.15
- **PostgreSQL**: >=9.5

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ibraheem4/redwood-stencil.git
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

### Development Commands

You can use the following yarn commands:

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
- [Node.js Documentation](https://nodejs.org/en/)
- [Yarn Documentation](https://yarnpkg.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
