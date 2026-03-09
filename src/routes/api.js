const express = require('express');
const rateLimit = require('express-rate-limit');

const authController = require('../controllers/authController');
const studentController = require('../controllers/studentController');
const lessonController = require('../controllers/lessonController');
const bookingController = require('../controllers/bookingController');
const sessionController = require('../controllers/sessionController');
const llmController = require('../controllers/llmController');

const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Rate limiter for LLM endpoint
const llmLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: { message: 'Too many summarization requests from this IP, please try again after a minute' },
});

// --- Auth Routes ---
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.get('/me', protect, authController.getMe);

// --- Student Routes (Parent only) ---
router.post('/students', protect, restrictTo('parent'), studentController.createStudent);
router.get('/students', protect, restrictTo('parent'), studentController.getStudents);

// --- Lesson Routes (Mentor only to create, all to view) ---
router.post('/lessons', protect, restrictTo('mentor'), lessonController.createLesson);
router.get('/lessons', protect, lessonController.getLessons);

// --- Booking Routes (Parent only) ---
router.post('/bookings', protect, restrictTo('parent'), bookingController.createBooking);
router.get('/bookings', protect, restrictTo('parent'), bookingController.getMyBookings);

// --- Session Routes ---
router.post('/sessions', protect, restrictTo('mentor'), sessionController.createSession);
router.get('/lessons/:id/sessions', protect, sessionController.getLessonSessions);

// --- LLM Routes ---
router.post('/llm/summarize', protect, llmLimiter, llmController.summarizeText);

module.exports = router;
