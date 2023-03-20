# School-System

### IN PROGRESS - will finish end of day March 20

## Purpose of Project

This is an API for a school system that facilitates teachers and the administration at the school by allowing them to have a complete log of attendance in each lesson.

## Installation

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Create a `.env` file in the root directory and add the following environment variables:
   DATABASE_URL=
   PORT=
4. Run database migrations: `npx prisma migrate dev`
5. Run `npm start` to start the server
6. Use Postman to test the endpoints

## Endpoints
You can access the REST API of the server using the following endpoints:
### GET
- /persons: Get all persons (teachers and students)
- /persons/:id/: Get a person by their personal number
- /persons/:id/lectures: Get all lectures of a person by their personal number
- /classes: Get all classes
- /classes/:id/: Get a class by its id
- /lectures: Get all lectures
- /lectures/:id/: Get a lecture by its id

### POST
- /persons: Create a new person (teacher or student)
- /classes: Create a new class
- /lectures: Create a new lecture
- /persons/:id/lectures/:lectureId: Create a new lecture for a person by their personal number

### PATCH
- /persons/:id/: Update a person by their personal number
- /classes/:id/: Update a class by its id
- /lectures/:id/: Update a lecture by its id
- /persons/:id/lectures/:lectureId: Update a lecture for a person by their personal number

### DELETE
- /persons/:id/: Delete a person by their personal number
- /classes/:id/: Delete a class by its id
- /lectures/:id/: Delete a lecture by its id
- /persons/:id/lectures/:lectureId: Delete a lecture for a person by their personal number

## Database Schema
The database schema is as follows:
- Person: A person can be a teacher or a student. The person has a personal number, a name, a surname, a role (teacher or student) and a class id (if the person is a student).
- Class: The subject at the school. This can be, for example, MAT102. A class has an id, a name and a teacher id.
- Lecture: A lecture is an instance of a class. For example, MAT102 at 10:00 and MAT102 at 12:00 are two different lectures. A lecture has an id, a class id, a date and a time.
- PersonOnLecture: A junction table that connects a person to a lecture. This is used to keep track of the attendance of a person in a lecture.

## Technologies Used

- Node.js
- Express
- Prisma
- PostgreSQL
- TypeScript