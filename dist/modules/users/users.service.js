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
exports.UserService = void 0;
const cow_model_1 = __importDefault(require("../cows/cow.model"));
const cow_service_1 = require("../cows/cow.service");
const user_model_1 = require("./user.model");
// get all users
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({}).sort({ _id: -1 });
    return users;
});
// get single user
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: id });
    return user;
});
// update user info
const updateUserById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return user;
});
// delete user
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndDelete({ _id: id });
    return user;
});
const updateBuyerBudget = (buyerId, cowId) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield user_model_1.User.findById({ _id: buyerId });
    const cow = yield cow_model_1.default.findById({ _id: cowId });
    if (buyer && cow) {
        const calculatePrice = (buyer === null || buyer === void 0 ? void 0 : buyer.budget) - (cow === null || cow === void 0 ? void 0 : cow.price);
        const result = yield user_model_1.User.findOneAndUpdate({ _id: buyerId }, { budget: calculatePrice }, {
            new: true,
        });
        return result;
    }
});
const updateSellerIncome = (cowId) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_service_1.CowService.getSingleCowById(cowId);
    if (cow) {
        const seller = yield user_model_1.User.findById({ _id: cow.seller._id });
        if (seller) {
            const calculatePrice = (seller === null || seller === void 0 ? void 0 : seller.income) + (cow === null || cow === void 0 ? void 0 : cow.price);
            const result = yield user_model_1.User.findOneAndUpdate({ _id: seller._id }, { income: calculatePrice }, {
                new: true,
            });
            return result;
        }
    }
});
exports.UserService = {
    getUsers,
    getSingleUserById,
    updateUserById,
    deleteUserById,
    updateBuyerBudget,
    updateSellerIncome,
};
