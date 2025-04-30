FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Ensure directories exist for Prisma
RUN mkdir -p generated/prisma src/common/prisma

# Generate Prisma client
RUN npx prisma generate --schema=src/common/prisma/schema.prisma

# Set environment variables
ARG CLERK_PUBLISHABLE_KEY
ENV CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}

# Build application
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev --legacy-peer-deps

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated

# Copy prisma schema for migrations
COPY --from=build /app/generated/prisma/schema.prisma ./prisma/schema.prisma

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]