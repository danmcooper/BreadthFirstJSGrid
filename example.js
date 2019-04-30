const { findShortestPath, GRID } = require("./bfs-grid");

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
