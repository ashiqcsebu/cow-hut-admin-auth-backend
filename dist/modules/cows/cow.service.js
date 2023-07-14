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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const paginationHelper_1 = require("../../helpers/paginationHelper");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = __importDefault(require("./cow.model"));
const createCow = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newCow = new cow_model_1.default(user);
    const createdCow = yield newCow.save();
    return createdCow;
});
// get all cows by pagination
const getAllCowsByPagination = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map(field => {
                const condition = {};
                if (field === 'price' || field === 'age') {
                    const numericValue = parseInt(searchTerm);
                    if (!isNaN(numericValue)) {
                        condition[field] = numericValue;
                    }
                }
                else {
                    condition[field] = {
                        $regex: searchTerm,
                        $options: 'i',
                    };
                }
                return condition;
            }),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                if (field === 'minPrice') {
                    return {
                        price: { $gte: parseInt(String(value), 10) },
                    };
                }
                else if (field === 'maxPrice') {
                    return {
                        price: { $lte: parseInt(String(value), 10) },
                    };
                }
                else {
                    return {
                        [field]: { $regex: value, $options: 'i' },
                    };
                }
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get all cows
const getCows = () => __awaiter(void 0, void 0, void 0, function* () {
    const cows = yield cow_model_1.default.find({}).populate('seller').sort({ _id: -1 });
    return cows;
});
// get single Cow
const getSingleCowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.default.findOne({ _id: id }).populate('seller');
    return cow;
});
// update cow info
const updateCowById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.default.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return cow;
});
// delete cow
const deleteCowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.default.findByIdAndDelete({ _id: id });
    return cow;
});
exports.CowService = {
    createCow,
    getAllCowsByPagination,
    getCows,
    getSingleCowById,
    updateCowById,
    deleteCowById,
};
