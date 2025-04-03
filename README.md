# 🧠 Knowledge Base Backend API

A TypeScript + Node.js REST API for managing hierarchical topics with versioning, shortest-path traversal, and secure user authentication using JWT.

---

## 🚀 Features

- 🔐 **JWT Authentication** with role-based access (Admin, Editor, Viewer)
- 📚 **Topics API** with full CRUD
- 🕓 **Version Control** – each update creates a new immutable topic version
- 🌳 **Recursive Tree Retrieval** – get a topic and all its nested children
- 🧭 **Shortest Path Algorithm** – between any two related topics
- 🧱 **Design Patterns** used:
  - Strategy – Role-based permissions
  - Composite – Topic tree structure
  - (Optional) Factory – Topic version creation
- 💾 **Flat-file persistence** via `topics.json` and `users.json`

---

## 🛠 Tech Stack

- Node.js + Express
- TypeScript
- JWT (`jsonwebtoken`)
- Password hashing with `bcrypt`
- File system persistence
- Decorators for role-based security

---

## 📂 Project Structure

```
src/
├── controllers/
├── decorators/
├── middleware/
├── models/
├── patterns/roles/
├── repositories/
├── routes/
├── services/
└── app.ts, server.ts
```

---

## 🔐 Roles

| Role    | Permissions                    |
|---------|--------------------------------|
| Admin   | Full access                    |
| Editor  | Create, update, read           |
| Viewer  | Read-only                      |

Role permissions are enforced via a `@RequireRole()` decorator.

---

## 📦 Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

> Requires Node.js and `ts-node`/`nodemon` for development.

---

## 🔑 Authentication

### 1. Register a User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "Editor"
}
```

### 2. Login

```http
POST /auth/login
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Copy the returned JWT token and include in headers:

```
Authorization: Bearer <your_token>
```

---

## 📘 API Overview

### 🔹 Topics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/topics` | Create a topic (`Admin`, `Editor`) |
| `GET` | `/topics` | Get all topics |
| `GET` | `/topics/:id` | Get topic by ID |
| `PUT` | `/topics/:id` | Update topic (creates version) |
| `GET` | `/topics/versions/:name` | Get all versions by topic name |
| `GET` | `/topics/:id/tree` | Get topic + subtopics recursively |
| `GET` | `/topics/path?from=ID&to=ID` | Get shortest path between two topics |

---

## 📄 Data Files

- `data/topics.json` – stores topics with versioning and hierarchy
- `data/users.json` – stores registered users with hashed passwords

---

## ✨ Bonus Features

- ✅ Decorators for clean role-based permission enforcement
- ✅ Bcrypt password hashing
- ✅ JWT middleware validation
- ✅ Flat-file repositories
- ✅ Strategy pattern for permissions (optional backup to decorator)

---

## 🙌 Author

Harys Vizcaino  
[Github](https://github.com/HarysVizcaino)
[Linkedin](https://www.linkedin.com/in/harys-vizcaino/)

---

## 📬 Questions?

Open an issue or contact the author. Built for a technical backend assessment.