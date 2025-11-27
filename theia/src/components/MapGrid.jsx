export default function MapGrid({ grid, path }) {
  const isOnPath = (r, c) =>
    path.some(([pr, pc]) => pr === r && pc === c);

  return (
    <div style={styles.map}>
      {grid.map((row, rIdx) => (
        <div key={rIdx} style={styles.row}>
          {row.map((cell, cIdx) => {
            const isRoom = typeof cell === "string";
            const onPath = isOnPath(rIdx, cIdx);

            return (
              <div
                key={cIdx}
                style={{
                  ...styles.cell,
                  backgroundColor: cell === 0
                    ? "#555"
                    : onPath
                    ? "#4a90e2"
                    : "#ddd",
                  color: isRoom ? "#000" : "#555",
                }}
              >
                {isRoom ? cell : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const styles = {
  map: {
    display: "inline-block",
    border: "2px solid #333",
    marginTop: "20px",
  },
  row: {
    display: "flex",
  },
  cell: {
    width: "80px",
    height: "80px",
    border: "1px solid #999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
  },
};
