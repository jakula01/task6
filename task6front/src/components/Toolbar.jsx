import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
export default function Toolbar({ onSelectTool, tool }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white">
      <div className="toolbar d-flex gap-2 p-2 border-bottom bg-white shadow-sm">
        <button
          className={`btn btn-outline-primary ${
            tool === "pencil" ? "active" : ""
          }`}
          onClick={() => onSelectTool("pencil")}
        >
          <FaPencilAlt /> Рисовать
        </button>
      </div>
      <Button variant="secondary" onClick={() => navigate("/presentations")}>
        ← Back
      </Button>
    </div>
  );
}
