import { RequestHandler } from 'express';
import { OrderService } from './order.service';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import Order from './order.model';
import Cow from '../cows/cow.model';

const createNewOrder: RequestHandler = async (req, res, next) => {
  try {
    const result = await OrderService.newOrder(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all orders
const getAllOrders: RequestHandler = async (req, res, next) => {
  try {
    const user = (req as any).user
    const orderId = req.params.id
    let result = null

    if(user && user?.role==="admin"){
      const orders = await OrderService.getOrders();
      result = orders
    }
    else if(user && user?.role==="buyer"){
      const order = await Order.findOne({ _id: orderId, buyer: user?._id });
      result = order
    }
    else if(user && user?.role==="seller"){
      const order = await Order.findOne({ _id: orderId });
      result = order
    }

   
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Orders retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get single order
const getSingleOrder: RequestHandler = async (req, res, next) => {
  try {
    const result = await OrderService.getSingleOrderById(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
};
