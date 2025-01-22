import { Router } from 'express';
import { calculateDeliveryPrice } from '../controllers/deliveryController';
import validateRequest from '../middleware/validateRequest';

const router = Router();

router.get('/', validateRequest, calculateDeliveryPrice);

export default router;
