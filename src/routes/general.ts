import { Router } from 'express';
import { generalController } from './../controllers/general';

const router = Router();


router.get("/user/:id", generalController.getUser)


export default router;
