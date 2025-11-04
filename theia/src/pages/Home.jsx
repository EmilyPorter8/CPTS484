import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Welcome to THEIA</h1>
      <div className="buttonContainer">
        <button onClick={() => navigate("/navigation")}>
          Navigation
        </button>
        <button onClick={() => navigate("/settings")}>
          Settings
        </button>
        <button onClick={() => navigate("/emergency")}>
          Emergency
        </button>
      </div>
    </div>
  );
};
