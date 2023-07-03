import { z } from 'zod';
import { Types } from 'mongoose';
import {
  cowBreeds,
  cowCategories,
  cowLabels,
  cowLocations,
} from './cow.constant';

const createCowZodValidate = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([...cowLocations] as [string, ...string[]]),
    breed: z.enum([...cowBreeds] as [string, ...string[]]),
    weight: z.number({
      required_error: 'Weight is required',
    }),
    label: z.enum([...cowLabels] as [string, ...string[]]),
    category: z.enum([...cowCategories] as [string, ...string[]]),
    seller: z.string().refine(value => Types.ObjectId.isValid(value), {
      message: 'Seller ID is required',
      path: ['seller'],
    }),
  }),
});

const updateCowZodValidate = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .optional(),
    location: z.enum([...cowLocations] as [string, ...string[]]).optional(),
    breed: z.enum([...cowBreeds] as [string, ...string[]]).optional(),
    weight: z
      .number({
        required_error: 'Weight is required',
      })
      .optional(),
    label: z.enum([...cowLabels] as [string, ...string[]]).optional(),
    category: z.enum([...cowCategories] as [string, ...string[]]).optional(),
    seller: z
      .string()
      .refine(value => Types.ObjectId.isValid(value), {
        message: 'Seller ID is required',
        path: ['seller'],
      })
      .optional(),
  }),
});

export const CowValidation = {
  createCowZodValidate,
  updateCowZodValidate,
};
