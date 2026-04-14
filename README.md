# BuildCheck — PC Component Compatibility API & Dashboard

BuildCheck is a production-grade full-stack application designed to help enthusiasts build their dream PCs without worrying about hardware compatibility. This project was developed as a Backend Developer Intern assignment.

**Live Demo:** [https://buildcheck-pc.vercel.app/](https://buildcheck-pc.vercel.app/)  
**API Documentation:** [https://buildcheck-rose.vercel.app/api/docs](https://buildcheck-rose.vercel.app/api/docs)

---

## 🚀 Features

- **Compatibility Engine**: Real-time validation for Socket matches (AM4, AM5, LGA1700), RAM types (DDR4 vs DDR5), PSU wattage headroom, and physical case clearance (GPU length).
- **Secure Authentication**: JWT-based auth with bcrypt password hashing and rate-limiting.
- **Admin Dashboard**: Specialized interface for administrators to manage the component catalog and user roles.
- **Mobile Responsive**: A modern, sleek UI built with React and Vanilla CSS Modules.
- **RESTful API**: Standardized JSON responses with comprehensive Swagger/OpenAPI documentation.

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express.js**: High-performance asynchronous runtime.
- **MongoDB + Mongoose**: Scalable NoSQL database with strict schema modeling.
- **Zod**: Robust request body validation.
- **JWT**: Stateless session management.
- **Winston**: Professional logging with multi-transport support.

### Frontend
- **React (Vite)**: Modern component-based logic.
- **CSS Modules**: Scoped, maintainable styling without third-party frameworks.
- **Axios**: Promised-based HTTP client with interceptors for auth tokens.

---

## 📖 API Documentation

The API is fully documented using Swagger UI. You can explore the endpoints, required headers, and response schemas by visiting the `/api/docs` route on the live server.

### Key Endpoints:
- `POST /api/v1/auth/register`: Create a new account.
- `GET /api/v1/components`: Fetch a list of all available parts.
- `POST /api/v1/compatibility/check`: Run a compatibility validation on a set of parts.
- `POST /api/v1/builds`: Save a validated build to your profile.

---

## ⚙️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/revolution737/buildcheck.git
   cd buildcheck
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example
   npm run seed  # Populates initial data
   npm run dev   # Starts on port 3000
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   # Set VITE_API_URL to http://localhost:3000/api/v1
   npm run dev
   ```

---

## 📈 Scalability Note
For a production-scale deployment, this architecture can be enhanced by:
1. **Redis Caching**: Cache compatibility check results for high-traffic part combinations.
2. **PostgreSQL Migration**: Move to a relational database if complex hardware relationships (multi-GPU, BIOS versions) require advanced join queries.
3. **Microservices**: Decoupling the Compatibility Engine from the Core Auth/User service to allow independent scaling.

---

## 📄 License
MIT License. Feel free to use this as a reference for your own projects!
