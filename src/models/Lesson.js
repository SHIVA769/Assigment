const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Lesson must belong to a mentor'],
    },
}, {
    timestamps: true,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
