import { useState } from "react";
import { buildingMap } from "../data/buildingMap";
import { findPath } from "../utils/pathfinding";
import MapGrid from "../components/MapGrid";
import LocationSelector from "../components/LocationSelector";
import RouteTTS from "../components/RouteTTS";

export default function Navigation() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [path, setPath] = useState([]);

    const rooms = buildingMap.flat().filter((c) => typeof c === "string");

    const handleFindRoute = () => {
        setPath(findPath(buildingMap, start, end));
    };

    return (
    <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>THEIA Indoor Navigation</h1>

        <LocationSelector
            rooms={rooms}
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
            onFindRoute={handleFindRoute}
        />

        <MapGrid grid={buildingMap} path={path} />

        {/* <RouteTTS route={path.map(([r, c]) => buildingMap[r][c])} /> */}
    </div>
    );
};