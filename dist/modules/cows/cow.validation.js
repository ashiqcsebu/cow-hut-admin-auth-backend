"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const createCowZodValidate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        location: zod_1.z.enum([...cow_constant_1.cowLocations]),
        breed: zod_1.z.enum([...cow_constant_1.cowBreeds]),
        weight: zod_1.z.number({
            required_error: 'Weight is required',
        }),
        label: zod_1.z.enum([...cow_constant_1.cowLabels]),
        category: zod_1.z.enum([...cow_constant_1.cowCategories]),
        seller: zod_1.z.string().refine(value => mongoose_1.Types.ObjectId.isValid(value), {
            message: 'Seller ID is required',
            path: ['seller'],
        }),
    }),
});
const updateCowZodValidate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .optional(),
        age: zod_1.z
            .number({
            required_error: 'Age is required',
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
        })
            .optional(),
        location: zod_1.z.enum([...cow_constant_1.cowLocations]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.cowBreeds]).optional(),
        weight: zod_1.z
            .number({
            required_error: 'Weight is required',
        })
            .optional(),
        label: zod_1.z.enum([...cow_constant_1.cowLabels]).optional(),
        category: zod_1.z.enum([...cow_constant_1.cowCategories]).optional(),
        seller: zod_1.z
            .string()
            .refine(value => mongoose_1.Types.ObjectId.isValid(value), {
            message: 'Seller ID is required',
            path: ['seller'],
        })
            .optional(),
    }),
});
exports.CowValidation = {
    createCowZodValidate,
    updateCowZodValidate,
};
