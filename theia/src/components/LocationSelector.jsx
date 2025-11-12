export default function LocationSelector({ rooms, start, end, setStart, setEnd, onFindRoute }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select value={start} onChange={(e) => setStart(e.target.value)}>
        <option value="">Select Start</option>
        {rooms.map((r) => <option key={r}>{r}</option>)}
      </select>

      <select value={end} onChange={(e) => setEnd(e.target.value)} style={{ marginLeft: "10px" }}>
        <option value="">Select Destination</option>
        {rooms.map((r) => <option key={r}>{r}</option>)}
      </select>

      <button onClick={onFindRoute} style={{ marginLeft: "10px" }}>
        Find Route
      </button>
    </div>
  );
}
