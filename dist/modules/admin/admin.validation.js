"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createAdminValidation = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is Required',
        }),
        role: zod_1.z.enum(['admin'], {
            required_error: 'Role is Required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First Name is Required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last Name is Required',
            }),
        }).required(),
        address: zod_1.z.string({
            required_error: 'Address is Required',
        }),
    }),
});
const loginAdminValidation = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is Required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
    }),
});
exports.AdminValidation = {
    createAdminValidation,
    loginAdminValidation
};
