import { useEffect } from "react";

export default function RouteTTS({ route }) {
  useEffect(() => {
    if (!route || route.length < 2) return;

    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any previous speech

    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1; // speed (0.1–10)
      utterance.pitch = 1;
      synth.speak(utterance);
    };

    // Create simple directions
    const directions = [];
    for (let i = 0; i < route.length; i++) {
      if (i === 0) directions.push(`Starting at ${route[i]}`);
      else if (i === route.length - 1) directions.push(`You have arrived at ${route[i]}`);
      else directions.push(`Proceed to ${route[i]}`);
    }

    // Speak each direction with a short pause
    let delay = 0;
    directions.forEach((line) => {
      setTimeout(() => speak(line), delay);
      delay += 2500; // 2.5 seconds between directions
    });
  }, [route]);

  return null; // no visual UI — only speech
}
