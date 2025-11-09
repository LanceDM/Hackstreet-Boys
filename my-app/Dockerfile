
FROM node:22-alpine AS build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=2048 --no-compilation-cache"

# Copy dependency files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the production-ready static files
RUN npm run build

FROM nginx:1.27-alpine

# Remove default Nginx site config to avoid conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files to Nginx’s web root
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

# Launch Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
