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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("../src/routes");
const app = (0, express_1.default)();
app.use('/', routes_1.routes);
dotenv_1.default.config();
describe('testing lecture routes', () => {
    test('POST /lectures - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const lectureData = {
            slug: 'CSS',
            className: 'Computer Science',
            time: '2021-05-05T12:00:00.000Z',
            description: 'This is a lecture',
        };
        const { body } = yield (0, supertest_1.default)(app).post("/lectures").send(lectureData);
        expect(body).toHaveProperty("data");
    }));
    test('GET should return all lectures and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/lectures');
        expect(res.status).toBe(201);
    }));
    test('GET should return a lecture and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/lectures/234534');
        expect(res.status).toBe(201);
    }));
    test('PATCH should update a lecture and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const lectureData = {
            id: '234534',
            slug: 'CSS',
            className: 'Computer Science',
            time: '2021-05-05T12:00:00.000Z',
            description: 'This is a lecture',
        };
    }));
    test('DELETE should delete a lecture and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete('/lectures/234534');
        expect(res.status).toBe(201);
    }));
});
