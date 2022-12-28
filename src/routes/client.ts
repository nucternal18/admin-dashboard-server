import { Router } from 'express';
import { clientController } from '../controllers/client';

const router = Router();


router.get("/products", clientController.getProducts)
router.get("/customers", clientController.getCustomers)
router.get("/transactions", clientController.getTransactions)
router.get("/geography", clientController.getGeography)


export default router;

