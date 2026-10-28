import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './server/routes/authRoutes.ts';
import projectRoutes from './server/routes/projectRoutes.ts';
import inquiryRoutes from './server/routes/inquiryRoutes.ts';
import systemRoutes from './server/routes/systemRoutes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProd = process.env.NODE_ENV === 'production';

  // Request parsing middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Basic CORS & headers
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/inquiries', inquiryRoutes);
  app.use('/api/system', systemRoutes);

  // Serve public directory and download endpoints
  app.use(express.static(path.resolve(__dirname, 'public')));
  app.get('/adarsh-narayan-portfolio.zip', (_req, res) => {
    const zipPath = path.resolve(__dirname, 'public/adarsh-narayan-portfolio.zip');
    res.download(zipPath, 'adarsh-narayan-portfolio.zip');
  });

  // Fallback for missing API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ success: false, message: `API route ${req.originalUrl} not found` });
  });

  // Integrate Vite for SPA serving
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Full-Stack Server] running on http://0.0.0.0:${PORT}`);
    console.log(`[API Routes] /api/projects, /api/inquiries, /api/auth, /api/system`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
