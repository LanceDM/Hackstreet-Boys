---

# 🧠 Hackstreet-Boys

A microservice-based web platform designed for **coding quiz management**, **user analytics**, and **real-time event tracking**.
This project combines a **Django REST API**, **PostgreSQL microservices**, and a **React frontend** — all orchestrated with Docker.

---

## ⚙️ Architecture Overview

The project is split into several independent services:

```
Hackstreet-Boys/
├── Backend-PostgreLocal/      → Django backend (main API + core DB)
│   ├── PostgreLocal/          → Django project
│   └── docker-compose.yml
│
├── data-storage/              → Secondary PostgreSQL service (logs & analytics)
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── judge0/                    → Local Judge0 stack (for code execution)
│   └── docker-compose.yml
│
└── my-app/                    → React frontend (Node + Nginx)
    ├── src/
    ├── public/
    └── docker-compose.yml
```

All services communicate through a shared Docker network called **`hackstreet-net`**.

---

## 🐳 Dockerized Services

| Service            | Description                     | Port | Container Name    |
| ------------------ | ------------------------------- | ---- | ----------------- |
| Django Backend     | REST API + Core logic           | 8000 | `django_backend`  |
| Backend DB         | PostgreSQL for backend data     | 5434 | `backend_db`      |
| Data Storage       | PostgreSQL for logs & analytics | 5433 | `data_storage_db` |
| React Frontend     | UI served via Nginx             | 3000 | `react_frontend`  |
| Adminer (optional) | Visual DB browser               | 8080 | `adminer`         |

---

## 🌐 Network Setup

All containers must be part of a single Docker network:

```bash
docker network create hackstreet-net
```

---

## 🚀 How to Run Everything

### 1. Start the Data Storage Microservice

```bash
cd data-storage
docker compose down -v
docker compose --env-file .env build --no-cache
docker compose --env-file .env up -d
```

### 2. Start the Django Backend

```bash
cd ../Backend-PostgreLocal
docker compose down -v
docker compose --env-file ./PostgreLocal/.env build --no-cache
docker compose --env-file ./PostgreLocal/.env up -d
```

✅ This runs:

* PostgreSQL 17 as the backend database
* Django 5.2.7 API server
* Automatic migrations and seeding

### 3. Start the Frontend

```bash
cd ../my-app
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

✅ React will be served through **Nginx on [http://localhost:3000](http://localhost:3000)**.

---

## 🔍 Checking Connections

### Django ↔ Data Storage

You can test the Django-to-data-storage connection with:

```bash
docker exec -it django_backend python manage.py shell
```

Then in the shell:

```python
from django.db import connections
with connections['data_storage'].cursor() as c:
    c.execute("SELECT 1;")
    print(c.fetchone())
```

If you see `(1,)`, it’s connected!

---

## 🧩 Database Access

### View backend DB

```bash
docker exec -it backend_db psql -U backend_user -d backend_db
```

### View data storage DB

```bash
docker exec -it data_storage_db psql -U storage_user -d data_storage
```

---

## 🌱 Database Seeding

To manually seed both databases:

```bash
docker exec -it django_backend python /app/PostgreLocal/setup_db.py
```

This runs:

* `seed` → Populates quizzes and sample data
* `default_events` → Populates `event_list` in the data-storage microservice

---

## 🧰 Development Notes

* React frontend API base URL: `http://django_backend:8000`
* CORS enabled for `http://localhost:3000`
* PostgreSQL version: **17**
* Node version: **22 LTS**

---

## 🧾 License

MIT License © 2025 Hackstreet-Boys Team

---
Powershell command to make a safe builder command

Set-Alias dockerbuildsafe "docker"
Function dockerbuildsafe { docker compose build --memory=2g --cpus=3 }

---