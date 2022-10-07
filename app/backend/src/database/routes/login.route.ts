import { Router } from 'express';
import loginValidation from '../middlewares/bodyValidations';
import UsersController from '../controllers/Users.controller';
import UsersService from '../services/Users.service';

const usersService = new UsersService();
const usersController = new UsersController(usersService);

const loginRouter = Router();

loginRouter.post(
  '/login',
  loginValidation.loginNotEmpty,
  loginValidation.loginValidateEmail,
  loginValidation.loginFieldsLength,
  usersController.findOne,
);

export default loginRouter;
