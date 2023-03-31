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
describe('testing person routes', () => {
    test('POST /persons - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const personData = {
            personalNumber: '1234567890',
            name: 'John Doe',
            email: 'john@gmail.com',
            password: 'password',
            role: 'STUDENT',
            createdAt: new Date(),
            classId: null,
            departmentHeadForClassId: null,
        };
        const { body } = yield (0, supertest_1.default)(app).post("/persons").send(personData);
        expect(body).toHaveProperty('data');
    }));
    test('GET should return all persons and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/persons');
        expect(res.status).toBe(201);
    }));
    test('GET should return a person and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/persons/1234567890');
        expect(res).toEqual({
            personalNumber: '1234567890',
            name: 'John Doe',
            email: 'john@gmail.com',
            password: 'password',
            role: 'STUDENT',
            createdAt: new Date(),
            classId: null,
            departmentHeadForClassId: null,
        });
    }));
    test('PATCH should update a person and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const personData = {
            personalNumber: '1234567890',
            name: 'John Doe',
            email: 'jon@gmail.com',
            password: 'password',
            role: 'STUDENT',
            classId: '234534',
            departmentHeadForClassId: null,
        };
        const res = yield (0, supertest_1.default)(app).patch('/persons/1234567890').send(personData);
        expect(res.status).toBe(201);
    }));
    test('DELETE should delete a person and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete('/persons/1234567890');
        expect(res.status).toBe(201);
    }));
    test('GET should create a new personOnLecture and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/persons/1234567890/lectures');
        expect(res.status).toBe(201);
    }));
    test('PATCH should delete a personOnLecture and return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const attendanceData = {
            attended: true,
        };
    }));
});
