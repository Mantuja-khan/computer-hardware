import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createRazorpayOrder);
router.post('/verify', protect, verifyRazorpayPayment);

export default router;
