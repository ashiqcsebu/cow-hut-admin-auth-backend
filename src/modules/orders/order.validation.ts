import { Types } from 'mongoose';
import { z } from 'zod';

const createOrderZodValidation = z.object({
  body: z.object({
    cow: z.string().refine(value => Types.ObjectId.isValid(value), {
      message: 'cow is required',
      path: ['cow'],
    }),
    buyer: z.string().refine(value => Types.ObjectId.isValid(value), {
      message: 'buyer is required',
      path: ['buyer'],
    }),
  }),
});

export const OrderValidation = {
  createOrderZodValidation,
};
