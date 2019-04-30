const GRID = {
  END: "END",
  BLOCKED: "BLOCKED",
  EMPTY: "EMPTY",
  VISITED: "VISITED"
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
  }

  visit() {
    Location.grid[this.distanceFromTop][this.distanceFromLeft] = GRID.VISITED;
  }

  isInRange() {
    const gridHeight = Location.grid.length;
    const gridLength = Location.grid[0].length;

    if (
      this.distanceFromLeft < 0 ||
      this.distanceFromLeft >= gridLength ||
      this.distanceFromTop < 0 ||
      this.distanceFromTop >= gridHeight
    ) {
      return false;
    }
    return true;
  }

  isEnd() {
    return (
      Location.grid[this.distanceFromTop][this.distanceFromLeft] === GRID.END
    );
  }

  isEmpty() {
    return (
      Location.grid[this.distanceFromTop][this.distanceFromLeft] === GRID.EMPTY
    );
  }
}

const findShortestPath = (startCoordinates, grid) => {
  Location.grid = grid;

  const location = new Location(startCoordinates[0], startCoordinates[1], []);
  let queue = [location];

  while (queue.length > 0) {
    const currentLocation = queue.shift();
    currentLocation.visit();

    for (let key in DIR) {
      const newLocation = goDirection(currentLocation, DIR[key], grid);
      if (newLocation.isInRange()) {
        if (newLocation.isEnd()) {
          return newLocation.path;
        }
        if (newLocation.isEmpty()) {
          queue.push(newLocation);
        }
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

  return new Location(newDft, newDfl, newPath);
};

// prettier-ignore
let testCases = [
  [
    [GRID.EMPTY,GRID.EMPTY,GRID.EMPTY,GRID.EMPTY],
    [GRID.EMPTY,GRID.BLOCKED,GRID.BLOCKED,GRID.BLOCKED],
    [GRID.EMPTY,GRID.BLOCKED,GRID.END,GRID.EMPTY],
    [GRID.EMPTY,GRID.EMPTY,GRID.EMPTY,GRID.EMPTY]
  ],
  [
    [GRID.EMPTY,GRID.BLOCKED,GRID.BLOCKED],
    [GRID.EMPTY,GRID.BLOCKED,GRID.BLOCKED],
    [GRID.EMPTY,GRID.END,GRID.EMPTY]
  ],
  [
    [GRID.EMPTY,GRID.EMPTY,GRID.EMPTY,GRID.EMPTY],
    [GRID.BLOCKED,GRID.EMPTY,GRID.EMPTY,GRID.EMPTY],
    [GRID.BLOCKED,GRID.EMPTY,GRID.BLOCKED,GRID.EMPTY],
    [GRID.EMPTY,GRID.EMPTY,GRID.END,GRID.EMPTY],
    [GRID.BLOCKED,GRID.BLOCKED,GRID.EMPTY,GRID.EMPTY]
  ]
];

testCases.forEach(test => {
  const path = findShortestPath([0, 0], test);

  console.log(`Takes ${path.length} moves. Path is: ${path}`);
});
