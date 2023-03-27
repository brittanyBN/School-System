"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const personController_1 = require("../controllers/personController");
const classController_1 = require("../controllers/classController");
const lectureController_1 = require("../controllers/lectureController");
exports.routes = express_1.default.Router();
// POST ROUTES
exports.routes.post("/persons", personController_1.newPerson);
exports.routes.post("/classes", classController_1.newClass);
exports.routes.post("/lectures", lectureController_1.newLecture);
// GET ROUTES
exports.routes.get("/persons", personController_1.getPersons);
exports.routes.get("/persons/:personalNumber", personController_1.getPerson);
exports.routes.get("/classes", classController_1.getClasses);
exports.routes.get("/classes/:slug", classController_1.getClass);
exports.routes.get("/lectures", lectureController_1.getLectures);
exports.routes.get("/lectures/:slug", lectureController_1.getLecture);
// PATCH ROUTES
exports.routes.patch("/persons/:personalNumber", personController_1.updatePerson);
exports.routes.patch("/classes/:id", classController_1.updateClass);
exports.routes.patch("/lectures/:slug", lectureController_1.updateLecture);
// DELETE ROUTES
exports.routes.delete("/persons/:personalNumber", personController_1.deletePerson);
exports.routes.delete("/classes/:id", classController_1.deleteClass);
exports.routes.delete("/lectures/:id", lectureController_1.deleteLecture);
