"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
/* eslint-disable consistent-type-definitions */
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodValidate = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...user_constant_1.userRoles], {
            required_error: 'Role is Required',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is Required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string().nonempty('First name is required'),
            lastName: zod_1.z.string().nonempty('Last name is required'),
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is Required',
        }),
        budget: zod_1.z
            .number({
            required_error: 'Budget is Required',
        })
            .optional(),
        income: zod_1.z
            .number({
            required_error: 'Income is Required',
        })
            .optional(),
    }),
});
const loginAuthValidation = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is Required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    createUserZodValidate,
    loginAuthValidation,
    refreshTokenZodSchema
};
