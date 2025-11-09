-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Video recordings metadata
CREATE TABLE video_record (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_seconds INT,
    size_mb FLOAT
);

-- Event list (types of interactions)
CREATE TABLE event_list (
    event_code VARCHAR(10) PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    description TEXT
);

-- Interaction logs
CREATE TABLE interaction_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_code VARCHAR(10) REFERENCES event_list(event_code),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data JSONB,
    num_actions INT
);
