"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./src/routes");
// SETUP
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
// ROUTES
exports.app.use('/', routes_1.routes);
exports.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
