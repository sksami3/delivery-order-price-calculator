# Stage 1: Base image for testing
FROM node:18 as test-stage

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Run tests
RUN npm run test

# Stage 2: Build application
FROM node:18 as build-stage

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .

RUN npm run build

# Stage 3: Production container
FROM node:18-alpine as production

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/node_modules
COPY package.json .

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["node", "dist/server.js"]
