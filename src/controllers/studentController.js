const Student = require('../models/Student');

exports.createStudent = async (req, res, next) => {
    try {
        const { name } = req.body;
        const parentId = req.user._id;

        const student = await Student.create({ name, parentId });
        res.status(201).json({ status: 'success', data: { student } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({ parentId: req.user._id });
        res.status(200).json({ status: 'success', results: students.length, data: { students } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
