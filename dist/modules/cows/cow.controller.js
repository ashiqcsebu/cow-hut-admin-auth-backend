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
exports.CowController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cow_service_1 = require("./cow.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../shared/pick"));
const cow_constant_1 = require("./cow.constant");
const pagination_1 = require("../../constants/pagination");
const createCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cow_service_1.CowService.createCow(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Cow created successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// get cows by pagination
const getCowsByDynamic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, cow_constant_1.cowFilterableFields);
        const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = yield cow_service_1.CowService.getAllCowsByPagination(filters, paginationOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Cows retrieved successfully !',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
// get all cows
const getAllCows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cow_service_1.CowService.getCows();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Cows retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get single cow
const getSingleCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cow_service_1.CowService.getSingleCowById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Cow retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// update user info
const updateCowInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cow_service_1.CowService.updateCowById(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Cow updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// delete user
const deleteCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cow_service_1.CowService.deleteCowById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Cow deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CowController = {
    createCow,
    getCowsByDynamic,
    getAllCows,
    getSingleCow,
    updateCowInfo,
    deleteCow,
};
