import { Router } from 'express';
import { createMedia, getMedia, getMediaById } from '../controllers/mediaController';

const router = Router();

router.get('/', getMedia);
router.post('/', createMedia);
router.get('/:id', getMediaById);

export default router;
