const { default: axios } = require('axios');
const _ = require('lodash');

const getGames = (genre, platform) => {
  return axios({
    method: 'get',
    url: process.env.API_URL,
  })
    .then((response) => {
      const { data } = response.data;

      let filteredData = data;

      if (genre && !platform) {
        filteredData = data.filter((data) => data.genre === genre);
      } else if (!genre && platform) {
        filteredData = data.filter((data) => data.platforms.includes(platform));
      } else if (genre && platform) {
        filteredData = data.filter(
          (data) => data.genre === genre && data.platforms.includes(platform)
        );
      }

      const merged = _.groupBy(filteredData, 'game');

      let mergedArr = [];

      Object.keys(merged).map((key) => {
        mergedArr.push(merged[key]);
      });

      const games = mergedArr.map((arr) => {
        const totalPlayTime = _.map(arr, 'playTime').reduce(
          (acc, val) => acc + val
        );

        return {
          game: arr[0].game,
          genre: arr[0].genre,
          platforms: arr[0].platforms,
          totalPlayTime,
          totalPlayers: arr.length,
        };
      });

      return games;
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getGames,
};
