import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PresentationsPage from "./pages/PresentationsPage";
import PresentationPage from "./pages/PresentstionPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/presentations" element={<PresentationsPage />} />
        <Route path="/presentation/:id" element={<PresentationPage />} />
      </Routes>
    </Router>
  );
}
