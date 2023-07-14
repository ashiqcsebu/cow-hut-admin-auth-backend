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
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("./order.model"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const users_service_1 = require("../users/users.service");
const cow_service_1 = require("../cows/cow.service");
// get all cows
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const cows = yield order_model_1.default.find({})
        .populate('buyer')
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .sort({ _id: -1 });
    return cows;
});
// get single order by id
const getSingleOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOne({ _id: id })
        .populate('buyer')
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    });
    return order;
});
// new order : Promise<IOrder | null>
const newOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    let newOrderData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const createdOrder = yield order_model_1.default.create([orderData], { session });
        if (!createdOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order');
        }
        const updateCowLabel = yield cow_service_1.CowService.updateCowById(orderData.cow, {
            label: 'sold out',
        });
        if (updateCowLabel) {
            const buyerBudgetUpdate = yield users_service_1.UserService.updateBuyerBudget(orderData.buyer, orderData.cow);
            if (buyerBudgetUpdate) {
                const sellerIncomeUpdate = yield users_service_1.UserService.updateSellerIncome(orderData.cow);
            }
        }
        newOrderData = createdOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newOrderData) {
        const orders = yield order_model_1.default.findOne({ _id: newOrderData._id })
            .populate('cow')
            .populate('buyer');
        return orders;
    }
});
exports.OrderService = {
    newOrder,
    getOrders,
    getSingleOrderById,
};
