"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = require("../users/user.model");
const cow_model_1 = __importDefault(require("../cows/cow.model"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const orderSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cow',
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const buyer = yield user_model_1.User.findById({ _id: this.buyer });
        const cow = yield cow_model_1.default.findById({ _id: this.cow });
        if ((buyer === null || buyer === void 0 ? void 0 : buyer.role) === 'buyer') {
            if ((cow === null || cow === void 0 ? void 0 : cow.label) === 'for sale') {
                if (buyer && cow && buyer.budget < cow.price) {
                    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'taka nai');
                }
                else {
                    next();
                }
            }
            else {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow Already Sold');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow Can Buy Only Buyer');
        }
    });
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
