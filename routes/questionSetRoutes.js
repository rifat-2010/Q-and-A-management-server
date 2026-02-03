const express = require('express');
const router = express.Router();
const {
    createQuestionSet,
    getQuestionSets,
    getQuestionSetById,
    updateQuestionSet,
    deleteQuestionSet,
} = require('../controllers/questionSetController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

router.route('/').get(protect, getQuestionSets).post(protect, admin, createQuestionSet);
router
    .route('/:id')
    .get(protect, getQuestionSetById)
    .put(protect, admin, updateQuestionSet)
    .delete(protect, admin, deleteQuestionSet);

module.exports = router;
