import React from "react";
import { Button } from "react-bootstrap";

export default function LeftPanel({ slides, currentIndex, onAdd, onSelect }) {
  return (
    <div
      className="border-end bg-light p-2"
      style={{ width: "200px", overflowY: "auto" }}
    >
      <Button
        variant="primary"
        size="sm"
        className="w-100 mb-2"
        onClick={onAdd}
      >
        + Add Slide
      </Button>
      <ul className="list-unstyled">
        {slides.map((slide, index) => (
          <li
            key={index}
            onClick={() => onSelect(index)}
            className={`p-2 rounded ${
              index === currentIndex ? "bg-primary text-white" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            {slide}
          </li>
        ))}
      </ul>
    </div>
  );
}
