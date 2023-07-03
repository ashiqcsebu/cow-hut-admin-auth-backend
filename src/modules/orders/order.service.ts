import mongoose from 'mongoose';
import { INewOrder, IOrder } from './order.interface';
import Order from './order.model';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { UserService } from '../users/users.service';
import { CowService } from '../cows/cow.service';

// get all cows
const getOrders = async (): Promise<IOrder[]> => {
  const cows = await Order.find({})
    .populate('buyer')
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .sort({ _id: -1 });
  return cows;
};

// get single order by id
const getSingleOrderById = async (id: string): Promise<IOrder | null> => {
  const order = await Order.findOne({ _id: id })
    .populate('buyer')
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    });
  return order;
};

// new order : Promise<IOrder | null>
const newOrder = async (orderData: INewOrder) => {
  let newOrderData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const createdOrder = await Order.create([orderData], { session });
    if (!createdOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    const updateCowLabel = await CowService.updateCowById(orderData.cow, {
      label: 'sold out',
    });

    if (updateCowLabel) {
      const buyerBudgetUpdate = await UserService.updateBuyerBudget(
        orderData.buyer,
        orderData.cow
      );

      if (buyerBudgetUpdate) {
        const sellerIncomeUpdate = await UserService.updateSellerIncome(
          orderData.cow
        );
      }
    }

    newOrderData = createdOrder[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newOrderData) {
    const orders = await Order.findOne({ _id: newOrderData._id })
      .populate('cow')
      .populate('buyer');

    return orders;
  }
};

export const OrderService = {
  newOrder,
  getOrders,
  getSingleOrderById,
};
