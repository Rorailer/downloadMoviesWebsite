#Stage 1
FROM oven/bun:latest as build-stage


# Set the working directory
WORKDIR /app

# Copy package.json and the bun lockfile to leverage Docker caching
# This step is only re-run if these files change.
COPY package.json bun.lock ./

# Install dependencies using Bun. It's much faster than npm or yarn.
RUN bun install

# Now copy the rest of your application's source code
COPY . .

# Build the project using vite
RUN ./node_modules/.bin/vite build




#Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# Copy the custom Nginx configuration for a React SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set the working directory
WORKDIR /usr/share/nginx/html

# Clean out the default Nginx content
RUN rm -rf ./*

# Copy the built React app from the build stage
COPY --from=build-stage /app/dist .

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]