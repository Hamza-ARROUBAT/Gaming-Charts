const { getGames } = require('../services/getGames');
const _ = require('lodash');

const topByPlaytime = (req, res) => {
  const { genre, platform } = req.query;

  getGames(genre, platform)
    .then((games) => {
      const topGames = _.sortBy(games, ['totalPlayTime']).reverse();
      res.json(topGames);
    })
    .catch((err) => console.error(err));
};

const topByPlayers = (req, res) => {
  const { genre, platform } = req.query;

  getGames(genre, platform)
    .then((games) => {
      const topGames = _.sortBy(games, ['totalPlayers']).reverse();
      res.json(topGames);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  topByPlaytime,
  topByPlayers,
};
