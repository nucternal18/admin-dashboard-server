import { Router } from 'express';
import { salesController } from '../controllers/sales';

const router = Router();


router.get("/", salesController.getSales);


export default router;
