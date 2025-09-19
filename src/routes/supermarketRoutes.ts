import { Router } from 'express';
import { getSupermarket } from '../controllers/supermarketController';

const router = Router();

router.get('/', getSupermarket);

export default router;
