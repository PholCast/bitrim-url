import {Router} from 'express';
import { getUrl, createUrl } from '../controllers/url-controller.js'

const router = Router();

// router.get('/:short_code', getUrl);
router.post('/', createUrl);

export default router;