const Response = require('../models/Response');

// @desc    Submit a response
// @route   POST /api/responses
// @access  Private
const createResponse = async (req, res, next) => {
    try {
        const { questionSetId, answers } = req.body;

        if (!questionSetId || !answers || answers.length === 0) {
            res.status(400);
            throw new Error('Please add all required fields');
        }

        const response = await Response.create({
            userId: req.user.id,
            questionSetId,
            answers,
        });

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all responses
// @route   GET /api/responses
// @access  Private/Admin
const getResponses = async (req, res, next) => {
    try {
        const responses = await Response.find()
            .populate('userId', 'name email')
            .populate('questionSetId', 'title');
        res.status(200).json(responses);
    } catch (error) {
        next(error);
    }
};

// @desc    Get response by ID
// @route   GET /api/responses/:id
// @access  Private/Admin
const getResponseById = async (req, res, next) => {
    try {
        const response = await Response.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('questionSetId', 'title')
            .populate('answers.questionId', 'questionText type options correctAnswer'); // Populate question text for better detail viewing

        if (!response) {
            res.status(404);
            throw new Error('Response not found');
        }

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createResponse,
    getResponses,
    getResponseById,
};
