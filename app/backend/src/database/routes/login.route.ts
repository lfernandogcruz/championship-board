import { Router } from 'express';
import loginValidation from '../middlewares/bodyValidations';

const router = Router();

router.get('/login', loginValidation);

export default router;
