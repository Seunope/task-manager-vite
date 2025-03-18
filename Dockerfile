# Build stage
FROM node:18-alpine AS build

# Define build arguments for environment variables
ARG VITE_API_URL
ARG VITE_API_URL_V1

# Set environment variables during the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_V1=$VITE_API_URL_V1

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built assets and server
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Start the server
CMD ["node", "server.js"]