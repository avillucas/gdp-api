# Stage 1: Build
FROM node:18-alpine AS builder
# Set the working directory
WORKDIR /usr/src/app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy application files and build the production bundle
COPY . .
RUN npm run build
# Stage 2: Production
FROM node:18-alpine
# Set the working directory
WORKDIR /usr/src/app
# Copy only the built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production
# Set environment variables for production
ENV NODE_ENV=production
# Expose the application port
EXPOSE 3000
# Command to run the application
CMD ["node", "dist/app.js"]