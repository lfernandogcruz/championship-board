import { Router } from 'express';
// import loginValidation from '../middlewares/bodyValidations';
import UsersController from '../controllers/Users.controller';
import UsersService from '../services/Users.service';

const usersService = new UsersService();
const usersController = new UsersController(usersService);
// const usersController = new UsersController();

const loginRouter = Router();

loginRouter.post(
  '/',
  // loginValidation.loginNotEmpty,
  // loginValidation.loginValidateEmail,
  // loginValidation.loginFieldsLength,
  // loginValidation.loginEmailAndPasswordValidation,
  usersController.findUser,
);

export default loginRouter;
