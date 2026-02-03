const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionSetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionSet',
        required: true,
    },
    type: {
        type: String,
        enum: ['mcq', 'boolean', 'descriptive'],
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String
        }
    ],
    correctAnswer: {
        type: String,
    },
    required: {
        type: Boolean,
        default: false,
    },
}, { collection: 'questions' });

module.exports = mongoose.model('Question', questionSchema);
