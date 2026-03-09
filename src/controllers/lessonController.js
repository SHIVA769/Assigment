const Lesson = require('../models/Lesson');

exports.createLesson = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const mentorId = req.user._id;

        const lesson = await Lesson.create({ title, description, mentorId });
        res.status(201).json({ status: 'success', data: { lesson } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getLessons = async (req, res, next) => {
    try {
        const lessons = await Lesson.find().populate('mentorId', 'name email');
        res.status(200).json({ status: 'success', results: lessons.length, data: { lessons } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
