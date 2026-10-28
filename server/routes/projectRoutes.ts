import { Router } from 'express';
import { projectController } from '../controllers/projectController.ts';
import { authMiddleware } from '../middleware/auth.ts';

const router = Router();

// Public routes for fetching portfolio projects
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);

// Guarded admin CRUD routes
router.post('/', authMiddleware as any, projectController.create as any);
router.put('/:id', authMiddleware as any, projectController.update as any);
router.delete('/:id', authMiddleware as any, projectController.delete as any);
router.post('/admin/reset-defaults', authMiddleware as any, projectController.resetDefaults as any);

export default router;
