const Question = require('../models/Question');
const QuestionSet = require('../models/QuestionSet');

// @desc    Add a question to a set
// @route   POST /api/questions
// @access  Private/Admin
const addQuestion = async (req, res, next) => {
    try {
        const { questionSetId, type, questionText, options, correctAnswer, required } = req.body;

        if (!questionSetId || !type || !questionText) {
            res.status(400);
            throw new Error('Please add all required fields');
        }

        const question = await Question.create({
            questionSetId,
            type,
            questionText,
            options,
            correctAnswer,
            required,
        });

        res.status(201).json(question);
    } catch (error) {
        next(error);
    }
};

// @desc    Get questions for a set
// @route   GET /api/questions/set/:setId
// @access  Private
const getQuestionsBySetId = async (req, res, next) => {
    try {
        const questions = await Question.find({ questionSetId: req.params.setId });
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private/Admin
const updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            res.status(404);
            throw new Error('Question not found');
        }

        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedQuestion);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
const deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            res.status(404);
            throw new Error('Question not found');
        }

        await question.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addQuestion,
    getQuestionsBySetId,
    updateQuestion,
    deleteQuestion,
};
