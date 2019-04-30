const { DIR, GRID } = require("./constants");
const { Location } = require("./location");

const findShortestPath = (startCoordinates, grid) => {
  Location.grid = grid;

  const location = new Location(startCoordinates[0], startCoordinates[1], []);
  let queue = [location];

  while (queue.length > 0) {
    const currentLocation = queue.shift();
    currentLocation.visit();

    for (let key in DIR) {
      const newLocation = currentLocation.goDirection(DIR[key]);
      if (newLocation.isEnd()) {
        return newLocation.path;
      }
      if (newLocation.isEmpty()) {
        queue.push(newLocation);
      }
    }
  }

  return false;
};

module.exports = { findShortestPath, GRID };
