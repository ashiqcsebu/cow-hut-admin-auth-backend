/* eslint-disable consistent-type-definitions */
import { z } from 'zod';
import { userRoles } from './user.constant';

const createUserZodValidate = z.object({
  body: z.object({
    role: z.enum([...userRoles] as [string, ...string[]], {
      required_error: 'Role is Required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone Number is Required',
    }),
    name: z.object({
      firstName: z.string().nonempty('First name is required'),
      lastName: z.string().nonempty('Last name is required'),
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
    address: z.string({
      required_error: 'Address is Required',
    }),
    budget: z
      .number({
        required_error: 'Budget is Required',
      })
      .optional(),
    income: z
      .number({
        required_error: 'Income is Required',
      })
      .optional(),
  }),
});



const loginAuthValidation = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});



const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});


export const AuthValidation = {
  createUserZodValidate,
  loginAuthValidation,
  refreshTokenZodSchema
};