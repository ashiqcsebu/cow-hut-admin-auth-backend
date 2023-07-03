import express from 'express';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
const router = express.Router();

router.post(
  '/',
  validateRequest(OrderValidation.createOrderZodValidation),
  auth(
    ENUM_USER_ROLE.BUYER
  ),
  OrderController.createNewOrder
);

router.get('/',  auth(
  ENUM_USER_ROLE.SELLER,
  ENUM_USER_ROLE.BUYER,
  ENUM_USER_ROLE.ADMIN
), OrderController.getAllOrders);


router.get('/:id', OrderController.getSingleOrder);

export const orderRoutes = router;
