const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questionSetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionSet',
        required: true,
    },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
            },
            answer: {
                type: String,
            },
        },
    ],
    submittedAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'responses' });

module.exports = mongoose.model('Response', responseSchema);
