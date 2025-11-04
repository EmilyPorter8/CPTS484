import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import Settings from "./pages/Settings";
import Emergency from "./pages/Emergency";
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/navigation" element={<Navigation />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/emergency" element={<Emergency />} />
    </Routes>
  );
}

export default App;
