"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_zodHanadler_1 = require("../users/user.zodHanadler");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_zodHanadler_1.AuthValidation.createUserZodValidate), auth_controller_1.authController.createUser);
router.post('/login', (0, validateRequest_1.default)(user_zodHanadler_1.AuthValidation.loginAuthValidation), auth_controller_1.authController.loginUser);
router.post('/refresh-token', 
// validateRequest(AuthValidation.refreshTokenZodSchema),
auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
