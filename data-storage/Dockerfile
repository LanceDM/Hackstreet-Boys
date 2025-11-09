FROM postgres:15

# Accept environment variables from Docker Compose
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG VIDEO_STORAGE_PATH

# Pass them into the environment
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV VIDEO_STORAGE_PATH=${VIDEO_STORAGE_PATH}

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Ensure the upload folder exists and is owned by postgres
RUN mkdir -p ${VIDEO_STORAGE_PATH} && chown -R postgres:postgres /videos

# Expose internal PostgreSQL port (fixed at 5432 inside the container)
EXPOSE 5432

# Persistent storage volumes
VOLUME ["/var/lib/postgresql/data", "/videos/uploads"]
  