# Docker Setup for IT Forum Backend

This document explains how to run the IT Forum backend using Docker.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Environment variables properly set up

## Environment Variables

Before running the Docker containers, make sure you have a `.env` file in the root directory with the following variables:

```
OPENROUTER_API_KEY=your_openrouter_api_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

These environment variables will be automatically loaded by Docker Compose.

## Running the Application

To start the backend and database:

```bash
docker-compose up -d
```

This will:
1. Build the backend Docker image if it doesn't exist
2. Start the PostgreSQL database container
3. Start the backend container
4. Expose the backend on port 3001

## Running Database Migrations

If you need to run database migrations, you can use the following command:

```bash
docker-compose exec backend npx prisma migrate deploy
```

## Accessing the Application

The backend will be available at `http://localhost:3001`.

## Stopping the Application

To stop the containers:

```bash
docker-compose down
```

To stop and remove volumes (this will delete all data in the database):

```bash
docker-compose down -v
```

## Rebuilding the Application

If you make changes to the code and need to rebuild:

```bash
docker-compose build
docker-compose up -d
```

## Viewing Logs

To view logs from the containers:

```bash
docker-compose logs -f
```

Or for a specific service:

```bash
docker-compose logs -f backend
``` 