const express = require('express');
const router = express.Router();
const {
    addQuestion,
    getQuestionsBySetId,
    updateQuestion,
    deleteQuestion,
} = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

router.post('/', protect, admin, addQuestion);
router.get('/set/:setId', protect, getQuestionsBySetId);
router
    .route('/:id')
    .put(protect, admin, updateQuestion)
    .delete(protect, admin, deleteQuestion);

module.exports = router;
