import { Router } from 'express';
import loginValidation from '../middlewares/bodyValidations';

const router = Router();

router.post(
  '/login',
  loginValidation.loginNotEmpty,
  loginValidation.loginValidateEmail,
  loginValidation.loginFieldsLength,
);

export default router;
