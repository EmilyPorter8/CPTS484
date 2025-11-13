import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Emergency() {
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const [emergencyContacted, setEmergencyContacted] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => {
          const newCount = countdown - 1;
          
          if (newCount === 0) {
            // Countdown finished - contact emergency services
            setIsActive(false);
            setEmergencyContacted(true);
          }
          
          return newCount;
        });
      }, 1000);
    } else if (countdown === 0 && !emergencyContacted) {
      setIsActive(false);
      setEmergencyContacted(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, countdown, emergencyContacted]);

  // Cancel emergency function
  const cancelEmergency = () => {
    setIsActive(false);
    setIsCanceled(true);
    setEmergencyContacted(false);
  };

  // Return to home
  const returnToHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="title">EMERGENCY MODE</h1>

      {/* Countdown Display */}
      {isActive && (
        <div>
          <p>Contacting emergency services in:</p>
          <h2>{countdown}</h2>
        </div>
      )}

      {emergencyContacted && (
        <div>
          <h2>Emergency Services Contacted</h2>
          <p>Help is on the way. Emergency contacts have been notified.</p>
        </div>
      )}

      {isCanceled && (
        <div>
          <h2>Emergency Canceled</h2>
          <p>No emergency services have been contacted.</p>
        </div>
      )}

      <div className="buttonContainer">
        {isActive && (
          <button onClick={cancelEmergency}>
            CANCEL EMERGENCY
          </button>
        )}

        {(emergencyContacted || isCanceled) && (
          <button onClick={returnToHome}>
            Return to Home
          </button>
        )}
      </div>
    </div>
  );
};