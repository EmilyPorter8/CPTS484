export function findPath(grid, start, end) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let startPos, endPos;

  // Find start and end coordinates
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === start) startPos = [r, c];
      if (grid[r][c] === end) endPos = [r, c];
    }
  }

  if (!startPos || !endPos) return [];

  const queue = [[...startPos]];
  const visited = new Set([startPos.join(",")]);
  const parent = {};

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    if (r === endPos[0] && c === endPos[1]) {
      // Reconstruct path
      let path = [];
      let node = endPos.join(",");
      while (node) {
        const [nr, nc] = node.split(",").map(Number);
        path.unshift([nr, nc]);
        node = parent[node];
      }
      return path;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < grid.length &&
        nc < grid[0].length &&
        grid[nr][nc] !== 0 &&
        !visited.has(`${nr},${nc}`)
      ) {
        visited.add(`${nr},${nc}`);
        parent[`${nr},${nc}`] = `${r},${c}`;
        queue.push([nr, nc]);
      }
    }
  }

  return [];
}