
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




export default function Emergency() {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [countdown, setCountdown] = useState(5);
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [contactResults, setContactResults] = useState([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [emergencyServicesContacted, setEmergencyServicesContacted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setEmergencyContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    if (!isCountdownActive || isCanceled) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(c => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCountdownActive(false);
    }
  }, [countdown, isCountdownActive, isCanceled]);

  useEffect(() => {
    if (isCanceled || emergencyServicesContacted || isCountdownActive) return;
    if (emergencyContacts.length === 0) {
      setEmergencyServicesContacted(true);
      return;
    }
    if (currentStep < emergencyContacts.length) {
      const timer = setTimeout(() => {
        setContactResults(results => [...results, { name: emergencyContacts[currentStep], answered: false }]);
        setCurrentStep(step => step + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep === emergencyContacts.length) {
      const timer = setTimeout(() => {
        setEmergencyServicesContacted(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isCanceled, emergencyServicesContacted, emergencyContacts, isCountdownActive]);

  const cancelEmergency = () => {
    setIsCanceled(true);
  };

  const returnToHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="title">EMERGENCY MODE</h1>

      {isCountdownActive && !isCanceled && (
        <div>
          <p>Contacting emergency contacts in:</p>
          <h2>{countdown}</h2>
        </div>
      )}


      {!isCountdownActive && !isCanceled && emergencyContacts.length > 0 && !emergencyServicesContacted && (
        <div>
          <p>Contacting emergency contacts...</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {emergencyContacts.map((name, idx) => (
              <li key={name + idx}>
                {contactResults[idx] ? (
                  <span style={{ color: "red" }}>{name} did not answer</span>
                ) : (
                  <span>Calling {name}...</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {emergencyServicesContacted && (
        <div>
          <h2>Emergency Services Contacted</h2>
          <p>No contacts answered. Help is on the way.</p>
        </div>
      )}

      {isCanceled && (
        <div>
          <h2>Emergency Canceled</h2>
          <p>No emergency services have been contacted.</p>
        </div>
      )}

      <div className="buttonContainer">
        {!isCanceled && !emergencyServicesContacted && (
          <button onClick={cancelEmergency}>
            CANCEL EMERGENCY
          </button>
        )}

        {(emergencyServicesContacted || isCanceled) && (
          <button onClick={returnToHome}>
            Return to Home
          </button>
        )}
      </div>
    </div>
  );
}