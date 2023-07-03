import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
const router = express.Router();

router.get('/',  auth(
    ENUM_USER_ROLE.ADMIN
  ), UserController.getAllUsers);
  
router.get('/:id',auth(
    ENUM_USER_ROLE.ADMIN
  ), UserController.getSingleUser);

router.patch('/:id',auth(
    ENUM_USER_ROLE.ADMIN
  ), UserController.updateUserInfo);

router.delete('/:id',auth(
    ENUM_USER_ROLE.ADMIN
  ), UserController.deleteUser);

export const UserRoutes = router;
