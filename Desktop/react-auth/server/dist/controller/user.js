"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const crypto_1 = require("crypto");
const user_1 = __importDefault(require("../entities/user"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const createUser = async (req, res, next) => {
    const { email, username, password, name } = req.body;
    if (!email || !password || !username || !name) {
        return next(new errorHandler_1.default('Please provide required information', 404));
    }
    const userExistWithEmail = await user_1.default.findOne({
        where: {
            email
        }
    });
    const userExistWitUserName = await user_1.default.findOne({
        where: {
            username
        }
    });
    if (userExistWitUserName || userExistWithEmail) {
        return next(new errorHandler_1.default('User already exist', 404));
    }
    const hassPwd = (0, crypto_1.createHash)(password);
    const user = user_1.default.create(Object.assign(Object.assign({}, req.body), { password: hassPwd }));
    await user.save();
    return res === null || res === void 0 ? void 0 : res.status(201).json(user);
};
exports.createUser = createUser;
const getUsers = async (_req, res, _next) => {
    const user = await user_1.default.find();
    return res.status(200).json(user);
};
exports.getUsers = getUsers;
//# sourceMappingURL=user.js.map