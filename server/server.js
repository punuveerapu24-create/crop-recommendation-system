const express = require('express');
const path = require('path');
const cors = require('cors');
const recommendRoutes = require('./routes/recommend');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for development
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging for monitoring & hackathon demo debugging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.startsWith('/api')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// API Routes
app.use('/api', recommendRoutes);

// Health check endpoint (for Render / uptime monitors)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'Crop Recommendation System (HACK-P302)',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime()
  });
});

// Serve frontend static assets in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Catch-all route to support client-side SPA routing (React Router or single page state)
app.get('*', (req, res) => {
  // If request starts with /api and was not handled above, return 404 JSON
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, error: 'API endpoint not found' });
  }

  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Crop Recommendation System (HACK-P302)</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #1e293b; padding: 2.5rem; border-radius: 1rem; border: 1px solid #334155; text-align: center; max-width: 500px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
            h1 { color: #10b981; margin-bottom: 0.5rem; font-size: 1.5rem; }
            p { color: #94a3b8; line-height: 1.6; }
            code { background: #0f172a; padding: 0.2rem 0.5rem; border-radius: 0.25rem; color: #38bdf8; font-size: 0.875rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Backend API is Active</h1>
            <p>Crop Recommendation System (HACK-P302) backend is running on port ${PORT}.</p>
            <p>To serve the frontend UI, run <code>npm run build</code> in the root directory to compile the React app into <code>client/dist</code>.</p>
          </div>
        </body>
        </html>
      `);
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred',
    message: err.message
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` 🌱 Crop Recommendation System (HACK-P302) Server`);
  console.log(` 🚀 Server listening on http://localhost:${PORT}`);
  console.log(` 📦 Static path: ${clientDistPath}`);
  console.log(` 🌾 API Health: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

module.exports = app;
