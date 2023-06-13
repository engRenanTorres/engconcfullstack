# Use an official Node.js runtime as the base image
FROM node:lts-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN yarn install
#ci --only=production

# Copy the application code to the container
COPY . .

# Build the application
RUN yarn build

RUN rm -r node_modules
RUN yarn install --production

# Use a lightweight Node.js runtime as the base image for the final image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the production dependencies from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port your Nest.js application listens on
EXPOSE 3001

# Set the command to run your Nest.js application
CMD ["node", "dist/main"]


