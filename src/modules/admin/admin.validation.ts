import { z } from 'zod';

const createAdminValidation = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is Required',
    }),
  role: z.enum(['admin'],{
    required_error: 'Role is Required',
  }),
  password: z.string({
    required_error: 'Password is Required',
  }),
  name: z.object({
    firstName: z.string({
      required_error: 'First Name is Required',
    }),
    lastName: z.string({
      required_error: 'Last Name is Required',
    }),
  }).required(),
  address: z.string({
      required_error: 'Address is Required',
    }),
  }),
});


const loginAdminValidation = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});

export const AdminValidation = {
  createAdminValidation,
  loginAdminValidation
};
