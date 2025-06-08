import React, { useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

export default function SlideCanvas({ drawingData, onDraw, tool, isEditable }) {
  const canvasRef = useRef(null);
  const isLoadingRef = useRef(false);

  // При изменении drawingData — загружаем его
  useEffect(() => {
    const load = async () => {
      if (canvasRef.current && Array.isArray(drawingData)) {
        isLoadingRef.current = true;
        await canvasRef.current.clearCanvas();
        if (drawingData.length > 0) {
          await canvasRef.current.loadPaths(drawingData);
        }
        isLoadingRef.current = false;
      }
    };
    load();
  }, [drawingData]);

  const handleChange = (paths) => {
    if (!isLoadingRef.current) {
      // Проверим, отличается ли новый paths от текущих
      const current = JSON.stringify(drawingData);
      const next = JSON.stringify(paths);

      if (current !== next) {
        onDraw?.(paths);
      }
    }
  };

  return (
    <ReactSketchCanvas
      ref={canvasRef}
      style={{ border: "1px solid #ccc", borderRadius: "4px" }}
      width="800px"
      height="500px"
      strokeWidth={2}
      strokeColor="black"
      onChange={handleChange}
      allowOnlyPointerType={tool === "pencil" ? "pen" : "none"}
      disabled={!isEditable || tool !== "pencil"}
      canvasStyle={{ touchAction: "none" }}
      withTimestamp={true}
    />
  );
}
