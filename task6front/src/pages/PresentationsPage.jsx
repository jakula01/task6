import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import SlidesList from "../components/SlidesList";
import Header from "../components/Head";
import {
  getAllPresentations,
  createPresentation,
} from "../services/presentationService";
import { UserContext } from "../contexts/UserContext";
export default function PresentationsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useContext(UserContext);

  const [presentations, setPresentations] = useState([]);
  useEffect(() => {
    getAllPresentations().then(setPresentations);
  }, []);
  const handleCreate = async () => {
    const title = prompt("Enter title for the new presentation");
    if (!title) return;
    const newPres = await createPresentation(title, username);
    navigate(`/presentation/${newPres.id}`);
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>All Presentations</h4>
          <Button onClick={handleCreate}>Create Presentation</Button>
        </div>
        <SlidesList presentations={presentations} />
      </Container>
    </>
  );
}
