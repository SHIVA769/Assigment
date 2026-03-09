const Booking = require('../models/Booking');
const Student = require('../models/Student');

exports.createBooking = async (req, res, next) => {
    try {
        const { studentId, lessonId } = req.body;
        const parentId = req.user._id;

        // Check if the student belongs to the parent
        const student = await Student.findOne({ _id: studentId, parentId });
        if (!student) {
            return res.status(403).json({ message: 'You can only book lessons for your own students' });
        }

        const booking = await Booking.create({ studentId, lessonId, bookedBy: parentId });
        res.status(201).json({ status: 'success', data: { booking } });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'This student is already booked for this lesson' });
        }
        res.status(400).json({ message: err.message });
    }
};

exports.getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ bookedBy: req.user._id })
            .populate('studentId', 'name')
            .populate('lessonId', 'title description');
        res.status(200).json({ status: 'success', results: bookings.length, data: { bookings } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
