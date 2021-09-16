const express = require('express');
const selectController = require('../controllers/selectController');

const router = express.Router();

router.get('/select_top_by_playtime', selectController.topByPlaytime);
router.get('/select_top_by_players', selectController.topByPlayers);

module.exports = router;
