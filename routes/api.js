const express = require('express');
const router = express.Router();
const controller = require('../controllers/imageController');

router.get('/query/:query', controller.searchImages);
router.get('/recent', controller.getRecentSearches);

module.exports = router;