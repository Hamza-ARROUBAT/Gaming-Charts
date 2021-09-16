const { getGames } = require('../services/getGames');
const _ = require('lodash');

const topByPlaytime = (req, res) => {
  const { genre, platform } = req.query;

  getGames(genre, platform)
    .then((games) => {
      const sorted = _.sortBy(games, ['totalPlayTime']).reverse();
      const topGames = sorted.slice(0, 3);
      res.json(topGames);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  topByPlaytime,
};
