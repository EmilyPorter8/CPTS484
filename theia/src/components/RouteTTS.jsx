import { useEffect } from "react";

export default function RouteTTS({ route }) {
  useEffect(() => {
    if (!route || route.length < 2) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const speak = (text) => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1;
      synth.speak(u);
    };

    // Convert a movement vector to a direction name
    const getDir = (dr, dc) => {
      if (dr === 0 && dc === 1) return "east";
      if (dr === 0 && dc === -1) return "west";
      if (dr === 1 && dc === 0) return "south";
      if (dr === -1 && dc === 0) return "north";
      return null;
    };

    // Determine turn direction between two directions
    const getTurn = (prev, next) => {
      const dirs = ["north", "east", "south", "west"];
      const prevIdx = dirs.indexOf(prev);
      const nextIdx = dirs.indexOf(next);

      if (prevIdx === -1 || nextIdx === -1) return null;

      if ((prevIdx + 1) % 4 === nextIdx) return "turn right";
      if ((prevIdx + 3) % 4 === nextIdx) return "turn left";

      return null; // U-turn or weird case
    };

    const directions = [];
    let prevDir = null;
    let forwardSteps = 0;

    for (let i = 1; i < route.length; i++) {
      const [r1, c1] = route[i - 1];
      const [r2, c2] = route[i];
      const dr = r2 - r1;
      const dc = c2 - c1;

      const dir = getDir(dr, dc);

      if (!prevDir) {
        prevDir = dir;
        forwardSteps = 1;
        continue;
      }

      if (dir === prevDir) {
        forwardSteps++;
      } else {
        // Speak accumulated forward movement
        const steps = forwardSteps * 10;
        directions.push(`Walk ${steps} steps forward.`);

        // Speak turn
        const turn = getTurn(prevDir, dir);
        if (turn) directions.push(turn);

        // Reset
        prevDir = dir;
        forwardSteps = 1;
      }
    }

    // Final forward movement
    if (forwardSteps > 0) {
      const steps = forwardSteps * 10;
      directions.push(`Walk ${steps} steps forward.`);
    }

    directions.push("You have arrived at your destination.");

    // Speak with delay
    let delay = 0;
    directions.forEach((line) => {
      setTimeout(() => speak(line), delay);
      delay += 2500;
    });
  }, [route]);

  return null;
}
