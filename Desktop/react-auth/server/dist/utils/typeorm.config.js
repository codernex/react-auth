"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("../entities/user"));
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    database: 'reactauth',
    host: 'localhost',
    username: 'postgres',
    password: '5105',
    logging: true,
    synchronize: true,
    port: 5432,
    entities: [user_1.default]
});
exports.default = dataSource;
//# sourceMappingURL=typeorm.config.js.map