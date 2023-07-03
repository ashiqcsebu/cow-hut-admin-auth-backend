import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import  { AuthValidation } from '../users/user.zodHanadler';
import { authController } from './auth.controller';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserZodValidate),
  authController.createUser
);

router.post('/login',validateRequest(AuthValidation.loginAuthValidation), authController.loginUser);

router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenZodSchema),
  authController.refreshToken
);

export const authRoutes = router;
