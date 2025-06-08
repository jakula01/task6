import UserList from "../components/UserList";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Head from "../components/Head";
import Toolbar from "../components/Toolbar";
import LeftPanel from "../components/LeftPanel";
import { UserContext } from "../contexts/UserContext";
import { getPresentationById } from "../services/presentationService";
import SlideCanvas from "../components/SlideCanvas";
export default function PresentationPage() {
  const { id } = useParams();
  const { username } = useContext(UserContext);
  const [presentation, setPresentation] = useState(null);
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [tool, setTool] = useState("pencil");
  const [drawingData, setDrawingData] = useState([]);
  const wsRef = useRef(null);
  useEffect(() => {
    getPresentationById(id).then((data) => {
      setPresentation(data);
      setSlides(["Slide 1", "Slide 2"]);
    });
  }, [id]);
  const addSlide = () => {
    setSlides((prev) => [...prev, `Slide ${prev.length + 1}`]);
  };

  if (!presentation) return <div>Loading...</div>;

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Head /> {/* ← Всегда наверху */}
      <Toolbar tool={tool} onSelectTool={setTool} /> {/* ← Под Head */}
      <div className="d-flex flex-grow-1">
        {/* Левая панель */}
        <LeftPanel
          slides={slides}
          currentIndex={currentSlideIndex}
          onAdd={addSlide}
          onSelect={setCurrentSlideIndex}
        />
        <div className="flex-grow-1 d-flex justify-content-center align-items-start p-4">
          <SlideCanvas
            drawingData={drawingData}
            onDraw={setDrawingData}
            tool={tool}
            isEditable={true}
          />
        </div>

        {/* Правая панель — пользователи */}
        <div
          className="border-start bg-light p-3"
          style={{ width: "250px", overflowY: "auto" }}
        >
          <UserList presentationId={id} username={username} />
        </div>
      </div>
    </div>
  );
}
