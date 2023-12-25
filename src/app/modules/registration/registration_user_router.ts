import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import userSchemaValidation from './registration_user_validation';
import { userController } from './registration_user_controller';
import loginValidation from '../login/user_login_validation';
import { loginController } from '../login/user_login_controller';
import auth from '../../middlewares/auth';
import { ROLE } from '../../Global/userConstat';
import changePasswordValidation from '../change_password/change_password.validation';
import { changePasswordController } from '../change_password/change_password.controller';
const router = Router();



router.post(
  '/register',
  ValidateRequest(userSchemaValidation),
  userController.createUserController,
);

router.post(
  '/login',
  ValidateRequest(loginValidation),
  loginController.login
);


router.post('/change-password',auth(ROLE.user,ROLE.admin),changePasswordController.createChangePassword)


export const UserRouter = router;
