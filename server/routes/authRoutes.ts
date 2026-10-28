import { Router } from 'express';
import { authController } from '../controllers/authController.ts';
import { authMiddleware } from '../middleware/auth.ts';

const router = Router();

// Public login endpoint
router.post('/login', authController.login);

// Guarded endpoints
router.get('/me', authMiddleware as any, authController.getProfile as any);
router.post('/change-password', authMiddleware as any, authController.changePassword as any);

export default router;
