FROM node:20-alpine

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npx prisma generate --schema=./src/common/prisma/schema.prisma
RUN if [ -n "$DATABASE_URL" ]; then npx prisma migrate deploy --schema=./src/common/prisma/schema.prisma; fi

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
