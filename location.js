const { GRID, DIR } = require("./constants");

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
      this.isInRange() &&
      Location.grid[this.distanceFromTop][this.distanceFromLeft] === GRID.END
    );
  }

  isEmpty() {
    return (
      this.isInRange() &&
      Location.grid[this.distanceFromTop][this.distanceFromLeft] === GRID.EMPTY
    );
  }

  goDirection(direction) {
    const newPath = this.path.concat(direction);

    let newDft = this.distanceFromTop;
    let newDfl = this.distanceFromLeft;

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
  }
}

module.exports = { Location };
