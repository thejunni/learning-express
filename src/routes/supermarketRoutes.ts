import { Router } from 'express';
import {
  createSupermarket,
  deleteSupermarket,
  getSupermarket,
  getSupermarketById,
  updateSupermarket,
} from '../controllers/supermarketController';

const router = Router();

router.get('/', getSupermarket);
router.post('/', createSupermarket);
router.put('/:id', updateSupermarket);
router.get('/:id', getSupermarketById);
router.delete('/:id', deleteSupermarket);

export default router;
