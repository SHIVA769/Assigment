const Session = require('../models/Session');
const Lesson = require('../models/Lesson');

exports.createSession = async (req, res, next) => {
    try {
        const { lessonId, date, topic, summary } = req.body;
        const mentorId = req.user._id;

        // Check if the lesson belongs to the mentor
        const lesson = await Lesson.findOne({ _id: lessonId, mentorId });
        if (!lesson) {
            return res.status(403).json({ message: 'You can only create sessions for your own lessons' });
        }

        const session = await Session.create({ lessonId, date, topic, summary });
        res.status(201).json({ status: 'success', data: { session } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getLessonSessions = async (req, res, next) => {
    try {
        const { id: lessonId } = req.params;
        const sessions = await Session.find({ lessonId });
        res.status(200).json({ status: 'success', results: sessions.length, data: { sessions } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
