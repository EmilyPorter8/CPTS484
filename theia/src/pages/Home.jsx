import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Welcome to THEIA</h1>
      <div className="buttonContainer">
        <button className="button" onClick={() => navigate("/navigation")}>
          Navigation
        </button>
        <button className="button" onClick={() => navigate("/settings")}>
          Settings
        </button>
        <button className="button" onClick={() => navigate("/emergency")}>
          Emergency
        </button>
      </div>
    </div>
  );
};
