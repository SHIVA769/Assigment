const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: [true, 'Session must belong to a lesson'],
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date'],
    },
    topic: {
        type: String,
        required: [true, 'Please provide a topic'],
        trim: true,
    },
    summary: {
        type: String,
        required: [true, 'Please provide a summary'],
    },
}, {
    timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
