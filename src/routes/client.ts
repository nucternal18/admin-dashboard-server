import { Router } from 'express';
import { clientController } from '../controllers/client';

const router = Router();


router.get("/products", clientController.getProducts)


export default router;

