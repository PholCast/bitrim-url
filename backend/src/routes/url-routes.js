import {Router} from 'express';
import { getUrl, createUrl } from '../controllers/url-controller.js'

const router = Router();

router.get('/:id', getUrl);
router.post('/', createUrl);

export default router;