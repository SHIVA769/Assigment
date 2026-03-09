const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Booking must reference a student'],
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: [true, 'Booking must reference a lesson'],
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must be made by a parent'],
    },
}, {
    timestamps: true,
});

// Ensure a student can't be booked for the same lesson twice
bookingSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
