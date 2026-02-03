const express = require('express');
const router = express.Router();
const {
    createResponse,
    getResponses,
    getResponseById,
} = require('../controllers/responseController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

router.post('/', protect, createResponse);
router.get('/', protect, admin, getResponses);
router.get('/:id', protect, admin, getResponseById);

module.exports = router;
