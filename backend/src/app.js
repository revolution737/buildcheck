require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./modules/auth/routes');
const componentRoutes = require('./modules/components/routes');
const buildRoutes = require('./modules/builds/routes');
const compatibilityRoutes = require('./modules/compatibility/routes');
const adminRoutes = require('./modules/admin/routes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Documentation
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { 
  customCssUrl: CSS_URL,
  customSiteTitle: "BuildCheck API Docs"
}));

// API Routes
const API_PREFIX = '/api/v1';
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/components`, componentRoutes);
app.use(`${API_PREFIX}/builds`, buildRoutes);
app.use(`${API_PREFIX}/compatibility`, compatibilityRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('BuildCheck API is running...');
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
  });
}

module.exports = app;
