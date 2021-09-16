const express = require('express');
const selectController = require('../controllers/selectController');

const router = express.Router();

router.get('/select_top_by_playtime', selectController.topByPlaytime);

module.exports = router;
