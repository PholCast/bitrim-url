import {Router} from 'express';
import { getUrlDetails, createUrl } from '../controllers/url-controller.js'

const router = Router();

router.get('/:short_code', getUrlDetails);
router.post('/', createUrl);

export default router;