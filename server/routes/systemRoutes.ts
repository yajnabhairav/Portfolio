import { Router } from 'express';
import { systemController } from '../controllers/systemController.ts';
import { authMiddleware } from '../middleware/auth.ts';

const router = Router();

// Public health check and latency ping
router.get('/health', systemController.getHealth);

// Guarded system metrics & analytics
router.get('/analytics', authMiddleware as any, systemController.getAnalytics as any);

export default router;
