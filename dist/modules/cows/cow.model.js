"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: cow_constant_1.cowLocations,
        required: true,
    },
    breed: {
        type: String,
        enum: cow_constant_1.cowBreeds,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: cow_constant_1.cowLabels,
        default: 'for sale',
        required: true,
    },
    category: {
        type: String,
        enum: cow_constant_1.cowCategories,
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
const Cow = (0, mongoose_1.model)('Cow', cowSchema);
exports.default = Cow;
