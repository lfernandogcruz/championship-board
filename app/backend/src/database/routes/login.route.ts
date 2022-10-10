import { Router } from 'express';
import loginValidation from '../middlewares/bodyValidations';
import UsersController from '../controllers/Users.controller';
import UsersService from '../services/Users.service';

const usersService = new UsersService();
const usersController = new UsersController(usersService);
// const usersController = new UsersController();

const loginRouter = Router();

// npx browserslist@latest --update-db ---> rodei isso pra tentar acabar com o Time Out
// sem sucesso

loginRouter.post(
  '/',
  loginValidation.loginNotEmpty,
  loginValidation.loginValidateEmail,
  loginValidation.loginFieldsLength,
  loginValidation.loginEmailAndPasswordValidation,
  (req, res) => usersController.findUser(req, res),

);
// loginRouter.get(
//   '/validate',
//   usersController.validateHeader,
// );

export default loginRouter;
