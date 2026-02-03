const mongoose = require('mongoose');

const questionSetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'questionSets' });

module.exports = mongoose.model('QuestionSet', questionSetSchema);
