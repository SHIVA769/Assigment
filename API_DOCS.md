# Mentora Backend API Documentation

The Mentora Backend API provides a simplified backend for a mentorship platform where parents, students, and mentors interact. It includes authentication, student creation, lesson creation, booking, session management, and LLM text summarization.

## Authentication

### POST `/api/auth/signup`
Sign up a new parent or mentor. 
- **Request Body**: `{ name: "...", email: "...", password: "...", role: "parent" | "mentor" }`
- **Response**: `201 Created` with JWT token.

### POST `/api/auth/login`
Log in an existing parent or mentor.
- **Request Body**: `{ email: "...", password: "..." }`
- **Response**: `200 OK` with JWT token.

### GET `/api/me`
Get the current authenticated user profile.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**: `200 OK` with user data.


## Student Management (Parent Only)

### POST `/api/students`
Create a new student under the parent's profile.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (Role: `parent`)
- **Request Body**: `{ name: "..." }`
- **Response**: `201 Created` with student data.

### GET `/api/students`
Get all students belonging to the parent.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (Role: `parent`)
- **Response**: `200 OK` with list of students.


## Lesson & Session Management

### POST `/api/lessons` (Mentor Only)
Create a new lesson.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (Role: `mentor`)
- **Request Body**: `{ title: "...", description: "..." }`
- **Response**: `201 Created` with lesson data.

### GET `/api/lessons`
Get all lessons.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**: `200 OK` with list of lessons.

### POST `/api/sessions` (Mentor Only)
Create a new session for a specific lesson.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (Role: `mentor`)
- **Request Body**: `{ lessonId: "...", date: "...", topic: "...", summary: "..." }`
- **Response**: `201 Created` with session data.

### GET `/api/lessons/{id}/sessions`
Get all sessions for a specific lesson.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**: `200 OK` with list of sessions.


## Booking System (Parent Only)

### POST `/api/bookings`
Assign a student to a lesson.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (Role: `parent`)
- **Request Body**: `{ studentId: "...", lessonId: "..." }`
- **Response**: `201 Created` with booking data.

### GET `/api/bookings`
Get all bookings for the parent.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (Role: `parent`)
- **Response**: `200 OK` with list of bookings.


## LLM Summarization

### POST `/api/llm/summarize`
Summarize a given text into 3-6 bullet points.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**: `{ text: "..." }`
- **Limits**: 50–8,000 characters.
- **Rate Limit**: 5 requests per minute.
- **Response**: `200 OK` with `summary` and `model`.

---
*Mentora Backend API v1.0.0*
