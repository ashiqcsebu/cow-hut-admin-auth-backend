import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';
import { User } from '../users/user.model';
import Cow from '../cows/cow.model';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  const buyer = await User.findById({ _id: this.buyer });
  const cow = await Cow.findById({ _id: this.cow });
  if (buyer?.role === 'buyer') {
    if (cow?.label === 'for sale') {
      if (buyer && cow && buyer.budget < cow.price) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'taka nai');
      } else {
        next();
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow Already Sold');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow Can Buy Only Buyer');
  }
});

const Order = model<IOrder, OrderModel>('Order', orderSchema);
export default Order;
