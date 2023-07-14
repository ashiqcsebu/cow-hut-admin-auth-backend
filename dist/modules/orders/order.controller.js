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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const order_model_1 = __importDefault(require("./order.model"));
const createNewOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.newOrder(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order create successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get all orders
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const orderId = req.params.id;
        let result = null;
        if (user && (user === null || user === void 0 ? void 0 : user.role) === "admin") {
            const orders = yield order_service_1.OrderService.getOrders();
            result = orders;
        }
        else if (user && (user === null || user === void 0 ? void 0 : user.role) === "buyer") {
            const order = yield order_model_1.default.findOne({ _id: orderId, buyer: user === null || user === void 0 ? void 0 : user._id });
            result = order;
        }
        else if (user && (user === null || user === void 0 ? void 0 : user.role) === "seller") {
            const order = yield order_model_1.default.findOne({ _id: orderId });
            result = order;
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Orders retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get single order
const getSingleOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getSingleOrderById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.OrderController = {
    createNewOrder,
    getAllOrders,
    getSingleOrder,
};
