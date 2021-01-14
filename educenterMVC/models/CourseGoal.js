const mongoose = require('mongoose');

const CourseGoalSchema = new mongoose.Schema({
    idCourse: {
        type: String,
        required: true
    },
    goals: {
        type: [String],
        default: []
    },
    prerequisites: {
        type: [String],
        default: []
    },
    targetedStudents: {
        type: [String],
        default: []
    },
});

const CourseGoal = mongoose.model('CourseGoal', CourseGoalSchema);

module.exports = CourseGoal;