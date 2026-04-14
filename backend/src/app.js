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
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      "style-src": ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      "img-src": ["'self'", "data:", "https://cdnjs.cloudflare.com"],
    },
  },
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Documentation - Manual Swagger UI Injection for Vercel
app.get('/api/docs', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>BuildCheck API Docs</title>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.12.0/swagger-ui.min.css" >
      <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.12.0/swagger-ui-bundle.js"> </script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.12.0/swagger-ui-standalone-preset.js"> </script>
      <script>
        window.onload = function() {
          const ui = SwaggerUIBundle({
            url: "/api/docs.json",
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
          })
          window.ui = ui
        }
      </script>
    </body>
    </html>
  `);
});

// Route to see the raw Swagger JSON (for debugging)
app.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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
