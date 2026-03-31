# Stage 1: Build the app
FROM node:20 AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built assets from build-stage to Nginx public folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration if needed
# We use a simple configuration that redirect all requests to index.html (useful for React Router handles routes)
RUN echo 'server { \
    listen 8080; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Inform Docker that the container is listening on port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
