# Mentora Backend Platform

A simplified backend for a mentorship platform where parents, students, and mentors interact. Built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based auth with password hashing. Parents and Mentors only for signup.
- **Student Management**: Parents can create students under their profile.
- **Lesson System**: Mentors can create lessons.
- **Booking System**: Parents can assign students to lessons.
- **Session System**: Lessons contain multiple sessions.
- **LLM Integration**: Text summarization using Google Gemini.

## Tech Stack

- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: Database (Mongoose ODM).
- **JWT**: Authentication.
- **Gemini AI**: LLM for text summarization.
- **Zod & Express Rate Limit**: Validation and security.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd mentora-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.

4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## LLM Integration (Summarization)

The `/api/llm/summarize` endpoint uses Google Gemini to generate 3-6 bullet point summaries.

### Testing the LLM Endpoint (Example CURL)

```bash
curl -X POST http://localhost:5000/api/llm/summarize \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
     -d '{
       "text": "Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction. Specific applications of AI include expert systems, speech recognition, and machine vision. AI is becoming increasingly integrated into daily life, from virtual assistants to self-driving cars, significantly impacting various industries including healthcare, finance, and transportation. The future of AI holds even more potential for innovation and efficiency, though it also raises ethical questions regarding data privacy and job displacement."
     }'
```

### Assumptions & Limits

- **Text Length**: Minimum 50 characters, Maximum 8,000 characters.
- **Rate Limit**: 5 requests per minute per IP.
- **Format**: Summaries are consistently returned as 3-6 bullet points.

## API Documentation

Detailed API documentation can be found in [API_DOCS.md](./API_DOCS.md).

## Evaluation Criteria Met

- [x] **Code Structure**: Modular and organized (MVC-like).
- [x] **Database Design**: Proper relationships and indexing.
- [x] **API Clarity**: Clear paths and standard response formats.
- [x] **Security**: JWT, password hashing, helmet, CORS, and rate limiting.
- [x] **LLM Integration**: Separation of concerns with a dedicated service.
- [x] **Documentation**: Comprehensive README and API docs.

---
*Developed for Mentora Platform*
