# BuildCheck

BuildCheck is a production-grade PC component compatibility checker. It helps users ensure that their selected PC parts work together without issues like socket mismatches, insufficient power, or physical size constraints.

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Zod, Swagger UI, Winston.
- **Frontend:** React (Vite), Plain CSS Modules, Axios, Lucide Icons.
- **Infrastructure:** Docker, Docker Compose.

## Features
- **Auth:** JWT-based authentication with role-based access control (USER/ADMIN).
- **Compatibility Engine:** Rules-based logic for checking hardware compatibility.
- **Build Management:** Save and manage multiple PC builds.
- **Admin Dashboard:** Full CRUD for PC components and user management.
- **API Documentation:** Interactive Swagger UI.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional)

### Local Development

1. **Clone the repository**
2. **Backend Setup:**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run seed    # Seed initial data (Admin: admin@buildcheck.dev / Admin@123)
   npm run dev
   ```
3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Docker Setup
```bash
docker-compose up --build
```

## API Quick Reference
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login and get JWT | Public |
| GET | `/api/v1/components` | List PC parts | Required |
| POST | `/api/v1/compatibility/check` | Check part compatibility | Required |
| POST | `/api/v1/builds` | Save a new build | Required |

Full documentation available at `http://localhost:3000/api/docs`.

## Scalability Note

### Horizontal Scaling
The backend uses stateless JWT for authentication, allowing multiple instances to run behind a load balancer (e.g., Nginx, AWS ALB) without the need for session synchronization.

### Caching
Compatibility check results can be significantly optimized by implementing a caching layer (e.g., Redis). Results can be keyed by a sorted hash of `componentIds`, ensuring that identical part combinations return instantly from cache.

### Database
MongoDB Atlas provides seamless horizontal scaling through read replicas and automatic sharding. Mongoose connection pooling is configured to handle high concurrency effectively.

### Modular Architecture
The codebase follows a modular design (Auth, Components, Builds, Compatibility). Each module is self-contained and communicates through defined interfaces, making it straightforward to extract them into independent microservices as demand grows.

### Rate Limiting
Express-level rate limiting is implemented on sensitive routes (Auth). In a high-scale production environment, this should be moved to a distributed rate limiter (e.g., Redis-backed) or handled at the API gateway level.

## Seed Data
The `npm run seed` command creates:
- **Admin:** `admin@buildcheck.dev` / `Admin@123`
- **User:** `user@buildcheck.dev` / `User@123`
- Realistic PC components including incompatible pairs for testing.
