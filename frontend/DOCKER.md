# Docker Deployment Guide

This document explains how to build and run the Next.js frontend application using Docker.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Environment variables properly configured

## Environment Setup

Create a `.env` file in the project root with the following variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Building and Running with Docker Compose

The easiest way to run the application is with Docker Compose:

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

## Building and Running Manually

If you prefer to build and run the Docker container manually:

```bash
# Build the Docker image
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key \
  --build-arg CLERK_SECRET_KEY=your_clerk_secret_key \
  -t it-forum-frontend .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key \
  -e CLERK_SECRET_KEY=your_clerk_secret_key \
  it-forum-frontend
```

## Accessing the Application

Once running, the application will be available at:

- http://localhost:3000

## Troubleshooting

If you encounter issues:

1. Verify that all environment variables are correctly set
2. Check container logs: `docker-compose logs -f` or `docker logs <container_id>`
3. Ensure ports are not already in use on your host machine 