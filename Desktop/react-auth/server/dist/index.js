"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const typeorm_config_1 = __importDefault(require("./utils/typeorm.config"));
dotenv_1.default.config();
const server = async (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true, limit: '100mb' }));
    await typeorm_config_1.default.initialize();
    app.use('/api/v1/user', user_1.default);
    app.listen(process.env.PORT, () => {
        console.log(`Development Server Started on PORT: ${process.env.PORT}`);
    });
};
server((0, express_1.default)());
//# sourceMappingURL=index.js.map