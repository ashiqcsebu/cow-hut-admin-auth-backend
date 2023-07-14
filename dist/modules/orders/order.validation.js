"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const createOrderZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string().refine(value => mongoose_1.Types.ObjectId.isValid(value), {
            message: 'cow is required',
            path: ['cow'],
        }),
        buyer: zod_1.z.string().refine(value => mongoose_1.Types.ObjectId.isValid(value), {
            message: 'buyer is required',
            path: ['buyer'],
        }),
    }),
});
exports.OrderValidation = {
    createOrderZodValidation,
};
