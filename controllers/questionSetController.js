const QuestionSet = require('../models/QuestionSet');
const User = require('../models/User');

// @desc    Create a new question set
// @route   POST /api/question-sets
// @access  Private/Admin
const createQuestionSet = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            res.status(400);
            throw new Error('Please add a title');
        }

        const questionSet = await QuestionSet.create({
            title,
            description,
            createdBy: req.user.id,
        });

        res.status(201).json(questionSet);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all question sets
// @route   GET /api/question-sets
// @access  Private
const getQuestionSets = async (req, res, next) => {
    try {
        const questionSets = await QuestionSet.find().populate('createdBy', 'name');
        res.status(200).json(questionSets);
    } catch (error) {
        next(error);
    }
};

// @desc    Get question set by ID
// @route   GET /api/question-sets/:id
// @access  Private
const getQuestionSetById = async (req, res, next) => {
    try {
        const questionSet = await QuestionSet.findById(req.params.id).populate('createdBy', 'name');

        if (!questionSet) {
            res.status(404);
            throw new Error('Question Set not found');
        }

        res.status(200).json(questionSet);
    } catch (error) {
        next(error);
    }
};

// @desc    Update question set
// @route   PUT /api/question-sets/:id
// @access  Private/Admin
const updateQuestionSet = async (req, res, next) => {
    try {
        const questionSet = await QuestionSet.findById(req.params.id);

        if (!questionSet) {
            res.status(404);
            throw new Error('Question Set not found');
        }

        // Check if user is admin - already covered by middleware but good to be safe if reused
        if (req.user.role !== 'admin') {
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedQuestionSet = await QuestionSet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedQuestionSet);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete question set
// @route   DELETE /api/question-sets/:id
// @access  Private/Admin
const deleteQuestionSet = async (req, res, next) => {
    try {
        const questionSet = await QuestionSet.findById(req.params.id);

        if (!questionSet) {
            res.status(404);
            throw new Error('Question Set not found');
        }

        await questionSet.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuestionSet,
    getQuestionSets,
    getQuestionSetById,
    updateQuestionSet,
    deleteQuestionSet,
};
