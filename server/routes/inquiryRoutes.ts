import { Router } from 'express';
import { inquiryController } from '../controllers/inquiryController.ts';
import { authMiddleware } from '../middleware/auth.ts';

const router = Router();

// Public route: submit contact inquiry
router.post('/', inquiryController.create);

// Read inbox inquiries for Adarsh's vault
router.get('/', inquiryController.getAll as any);
router.patch('/:id/status', inquiryController.updateStatus as any);
router.delete('/:id', inquiryController.delete as any);

export default router;
