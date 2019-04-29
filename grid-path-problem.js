const GRID = {
  VALUES: {
    END: 9,
    BLOCKED: 0,
    EMPTY: 1
  },
  STATUS: {
    VALID: 1000,
    INVALID: 1001
  },
  INTERNAL: {
    VISITED: 1003
  }
};

const DIR = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT"
};

class Location {
  constructor(distanceFromTop, distanceFromLeft, path) {
    this.distanceFromTop = distanceFromTop;
    this.distanceFromLeft = distanceFromLeft;
    this.path = path;
    this.initialStatus = this.status();
  }
  status() {
    const gridHeight = Location.grid.length;
    const gridLength = Location.grid[0].length;

    if (
      this.distanceFromLeft < 0 ||
      this.distanceFromLeft >= gridLength ||
      this.distanceFromTop < 0 ||
      this.distanceFromTop >= gridHeight
    ) {
      // location is not on the grid--return false
      return GRID.STATUS.INVALID;
    } else if (
      Location.grid[this.distanceFromTop][this.distanceFromLeft] ===
      GRID.VALUES.END
    ) {
      return GRID.VALUES.END;
    } else if (
      Location.grid[this.distanceFromTop][this.distanceFromLeft] !==
      GRID.VALUES.EMPTY
    ) {
      // location is either an obstacle or has been visited
      return GRID.VALUES.BLOCKED;
    } else {
      return GRID.STATUS.VALID;
    }
  }
}

const findShortestPath = (startCoordinates, grid) => {
  Location.grid = grid;

  const location = new Location(startCoordinates[0], startCoordinates[1], []);
  let queue = [location];

  while (queue.length > 0) {
    const currentLocation = queue.shift();

    for (let key in DIR) {
      var newLocation = goDirection(currentLocation, DIR[key], grid);
      if (newLocation.status() === GRID.VALUES.END) {
        return newLocation.path;
      } else if (newLocation.initialStatus === GRID.STATUS.VALID) {
        queue.push(newLocation);
      }
    }
  }

  return false;
};

const goDirection = (currentLocation, direction) => {
  const newPath = currentLocation.path.concat(direction);

  let newDft = currentLocation.distanceFromTop;
  let newDfl = currentLocation.distanceFromLeft;

  if (direction === DIR.UP) {
    newDft -= 1;
  } else if (direction === DIR.RIGHT) {
    newDfl += 1;
  } else if (direction === DIR.DOWN) {
    newDft += 1;
  } else if (direction === DIR.LEFT) {
    newDfl -= 1;
  }

  const newLocation = new Location(newDft, newDfl, newPath);

  if (newLocation.status() === GRID.STATUS.VALID) {
    Location.grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] =
      GRID.INTERNAL.VISITED;
  }

  return newLocation;
};

// prettier-ignore
let testCases = [
  [
    [GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY],
    [GRID.VALUES.EMPTY,GRID.VALUES.BLOCKED,GRID.VALUES.BLOCKED,GRID.VALUES.BLOCKED],
    [GRID.VALUES.EMPTY,GRID.VALUES.BLOCKED,GRID.VALUES.END,GRID.VALUES.EMPTY],
    [GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY]
  ],
  [
    [GRID.VALUES.EMPTY,GRID.VALUES.BLOCKED,GRID.VALUES.BLOCKED],
    [GRID.VALUES.EMPTY,GRID.VALUES.BLOCKED,GRID.VALUES.BLOCKED],
    [GRID.VALUES.EMPTY,GRID.VALUES.END,GRID.VALUES.EMPTY]
  ],
  [
    [GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY],
    [GRID.VALUES.BLOCKED,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY],
    [GRID.VALUES.BLOCKED,GRID.VALUES.EMPTY,GRID.VALUES.BLOCKED,GRID.VALUES.EMPTY],
    [GRID.VALUES.EMPTY,GRID.VALUES.EMPTY,GRID.VALUES.END,GRID.VALUES.EMPTY],
    [GRID.VALUES.BLOCKED,GRID.VALUES.BLOCKED,GRID.VALUES.EMPTY,GRID.VALUES.EMPTY]
  ]
];

testCases.forEach(test => {
  const path = findShortestPath([0, 0], test);

  console.log(`Takes ${path.length} moves. Path is: ${path}`);
});
