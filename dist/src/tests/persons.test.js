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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const client_1 = __importDefault(require("../utils/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
describe('Person Endpoints', () => {
    let createdPerson;
    const password = 'testpassword';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const salt = bcryptjs_1.default.genSaltSync();
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        createdPerson = yield client_1.default.person.create({
            data: {
                personalNumber: '1234567890',
                name: 'Test Person',
                email: 'testperson@test.com',
                password: hashedPassword,
                role: 'STUDENT',
            },
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client_1.default.personOnLecture.deleteMany({});
        yield client_1.default.person.deleteMany({});
        yield client_1.default.lecture.deleteMany({});
        yield client_1.default.class.deleteMany({});
        yield client_1.default.$disconnect();
    }));
    describe('POST /person', () => {
        it('should create a new person', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app).post('/person').send({
                personalNumber: '1234561234',
                name: 'John Doe',
                email: 'johndoe@test.com',
                password: 'password123',
                role: 'STUDENT',
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toEqual('person created');
            expect(res.body.data.personalNumber).toEqual('1234561234');
            expect(res.body.data.name).toEqual('John Doe');
            expect(res.body.data.email).toEqual('johndoe@test.com');
            expect(res.body.data.role).toEqual('STUDENT');
            expect(res.body.data.password).toBeUndefined();
        }));
        it('should not create a new person with invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app).post('/person').send({
                personalNumber: '123451234',
                name: 'Invalid Person',
                email: 'invalidperson@test.com',
                password: 'password123',
                role: 'invalid',
            });
            expect(res.statusCode).toEqual(500);
            expect(res.body.message).toEqual('Error creating person');
        }));
    });
    describe('GET /persons', () => {
        it('should fetch all persons', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app).get('/persons').send();
            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toEqual('persons fetched');
            expect(res.body.data).toHaveLength(2);
        }));
    });
    describe('GET /person/:personalNumber', () => {
        it('should fetch a single person by personal number', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app).get("/person/1234567890").send();
            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toEqual('person fetched');
            expect(res.body.data.personalNumber).toEqual(createdPerson.personalNumber);
            expect(res.body.data.name).toEqual(createdPerson.name);
            expect(res.body.data.email).toEqual(createdPerson.email);
            expect(res.body.data.role).toEqual(createdPerson.role);
            expect(res.body.data.classId).toEqual(createdPerson.classId);
            expect(res.body.data.password).toBeUndefined();
        }));
        it('should return an error for non-existent personal number', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app).get('/person/12345678901').send();
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('person not found');
        }));
    });
});
//# sourceMappingURL=persons.test.js.map