#!/usr/bin/env python3
import psycopg2
import os
from psycopg2 import sql

print("🚀 Connecting to database...")

conn = psycopg2.connect(
    dbname=os.getenv("POSTGRES_DB", "judge0"),
    user=os.getenv("POSTGRES_USER", "postgres"),
    password=os.getenv("POSTGRES_PASSWORD", "password"),
    host=os.getenv("POSTGRES_HOST", "db"),
    port=os.getenv("POSTGRES_PORT", "5432"),
)
cur = conn.cursor()

# Basic schema creation for Judge0 (minimal viable)
commands = [
    """
    CREATE TABLE IF NOT EXISTS languages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        version VARCHAR(50),
        source_file VARCHAR(50),
        compile_cmd VARCHAR(255),
        run_cmd VARCHAR(255)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        source_code TEXT,
        language_id INTEGER REFERENCES languages(id),
        stdin TEXT,
        stdout TEXT,
        stderr TEXT,
        compile_output TEXT,
        message TEXT,
        status_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS submission_statuses (
        id SERIAL PRIMARY KEY,
        description VARCHAR(50)
    );
    """
]

for command in commands:
    cur.execute(command)
    print("✅ Executed command")

conn.commit()
cur.close()
conn.close()

print("🎉 Database initialized successfully!")
