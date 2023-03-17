import express from "express";
import {
    getPerson,
    getPersons,
    newPerson,
    updatePerson,
    deletePerson,
} from "../controllers/personController";
import {
    getClass,
    getClasses,
    newClass,
    updateClass,
    deleteClass,
} from "../controllers/classController";
import {
    getLecture,
    getLectures,
    newLecture,
    updateLecture,
    deleteLecture,
} from "../controllers/lectureController";

export const routes = express.Router();

// POST ROUTES
routes.post("/persons", newPerson);
routes.post("/classes", newClass);
routes.post("/lectures", newLecture);

// GET ROUTES
routes.get("/persons", getPersons);
routes.get("/persons/:personalNumber", getPerson);
routes.get("/classes", getClasses);
routes.get("/classes/:slug", getClass);
routes.get("/lectures", getLectures);
routes.get("/lectures/:slug", getLecture);

// PATCH ROUTES
routes.patch("/persons/:personalNumber", updatePerson);
routes.patch("/classes/:slug", updateClass);
routes.patch("/lectures/:slug", updateLecture);

// DELETE ROUTES
routes.delete("/persons/:personalNumber", deletePerson);
routes.delete("/classes/:id", deleteClass);
routes.delete("/lectures/:slug", deleteLecture);
